import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { authRateLimiter, validatePasswordStrength, isValidEmail, cleanupAuthState } from '@/lib/security';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        if (event === 'SIGNED_IN') {
          toast({
            title: "Welcome back!",
            description: "Successfully signed in.",
          });
        } else if (event === 'SIGNED_OUT') {
          toast({
            title: "Signed out",
            description: "Come back soon!",
          });
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [toast]);

  const signUp = async (email: string, password: string, fullName?: string) => {
    try {
      setLoading(true);

      // Input validation
      if (!isValidEmail(email)) {
        const error = new Error('Please enter a valid email address');
        toast({
          title: "Invalid email",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }

      // Password strength validation
      const passwordValidation = validatePasswordStrength(password);
      if (!passwordValidation.isValid) {
        const error = new Error(passwordValidation.message);
        toast({
          title: "Weak password",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }

      // Check rate limiting
      if (authRateLimiter.isRateLimited(email)) {
        const remainingTime = Math.ceil(authRateLimiter.getRemainingTime(email) / (1000 * 60));
        const error = new Error(`Too many attempts. Please try again in ${remainingTime} minutes.`);
        toast({
          title: "Rate limited",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }

      // Clean up any existing auth state
      cleanupAuthState();

      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email: email.toLowerCase().trim(),
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: fullName ? { full_name: fullName.trim() } : undefined
        }
      });

      if (error) {
        authRateLimiter.recordAttempt(email);
        toast({
          title: "Sign up failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        authRateLimiter.reset(email);
        toast({
          title: "Check your email",
          description: "Please check your email to confirm your account.",
        });
      }

      return { error };
    } catch (error: any) {
      authRateLimiter.recordAttempt(email);
      toast({
        title: "Sign up failed",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);

      // Input validation
      if (!isValidEmail(email)) {
        const error = new Error('Please enter a valid email address');
        toast({
          title: "Invalid email",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }

      if (!password || password.length < 6) {
        const error = new Error('Password is required');
        toast({
          title: "Invalid password",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }

      // Check rate limiting
      if (authRateLimiter.isRateLimited(email)) {
        const remainingTime = Math.ceil(authRateLimiter.getRemainingTime(email) / (1000 * 60));
        const error = new Error(`Too many attempts. Please try again in ${remainingTime} minutes.`);
        toast({
          title: "Rate limited",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }

      // Clean up any existing auth state
      cleanupAuthState();

      const { error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase().trim(),
        password,
      });

      if (error) {
        authRateLimiter.recordAttempt(email);
        toast({
          title: "Sign in failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        authRateLimiter.reset(email);
      }

      return { error };
    } catch (error: any) {
      authRateLimiter.recordAttempt(email);
      toast({
        title: "Sign in failed",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      
      // Clean up auth state first
      cleanupAuthState();
      
      // Attempt global sign out
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // Continue even if this fails
        console.warn('Global signout failed:', err);
      }
      
    } catch (error: any) {
      toast({
        title: "Sign out failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};