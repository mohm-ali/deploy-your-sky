import { ReactNode, useEffect } from 'react';
import { securityHeaders } from '@/lib/security';

interface SecurityProviderProps {
  children: ReactNode;
}

export const SecurityProvider = ({ children }: SecurityProviderProps) => {
  useEffect(() => {
    // Add security headers where possible (limited in browser)
    const addSecurityMeta = () => {
      // Add Content Security Policy meta tag if not already present
      if (!document.querySelector('meta[http-equiv="Content-Security-Policy"]')) {
        const cspMeta = document.createElement('meta');
        cspMeta.setAttribute('http-equiv', 'Content-Security-Policy');
        cspMeta.setAttribute('content', securityHeaders['Content-Security-Policy']);
        document.head.appendChild(cspMeta);
      }

      // Add X-Frame-Options meta tag
      if (!document.querySelector('meta[http-equiv="X-Frame-Options"]')) {
        const frameOptionsMeta = document.createElement('meta');
        frameOptionsMeta.setAttribute('http-equiv', 'X-Frame-Options');
        frameOptionsMeta.setAttribute('content', 'DENY');
        document.head.appendChild(frameOptionsMeta);
      }

      // Add referrer policy
      if (!document.querySelector('meta[name="referrer"]')) {
        const referrerMeta = document.createElement('meta');
        referrerMeta.setAttribute('name', 'referrer');
        referrerMeta.setAttribute('content', 'strict-origin-when-cross-origin');
        document.head.appendChild(referrerMeta);
      }
    };

    addSecurityMeta();

    // Note: Clickjacking prevention removed to avoid iframe navigation issues

    // Disable right-click context menu in production (optional)
    const handleContextMenu = (e: MouseEvent) => {
      if (process.env.NODE_ENV === 'production') {
        e.preventDefault();
      }
    };

    // Disable F12, Ctrl+Shift+I, Ctrl+U in production (optional)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (process.env.NODE_ENV === 'production') {
        if (
          e.key === 'F12' ||
          (e.ctrlKey && e.shiftKey && e.key === 'I') ||
          (e.ctrlKey && e.key === 'U')
        ) {
          e.preventDefault();
        }
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return <>{children}</>;
};