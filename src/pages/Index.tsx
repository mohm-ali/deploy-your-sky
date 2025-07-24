import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Server, Zap, Shield, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const { user } = useAuth();

  if (user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Welcome back!</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Manage your cloud infrastructure with ease
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/servers">View Servers</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                Servers
              </CardTitle>
              <CardDescription>Deploy and manage your applications</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Create web apps, APIs, databases, and more with just a few clicks.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Fast Deployment
              </CardTitle>
              <CardDescription>From code to production in seconds</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Deploy your applications instantly with our optimized infrastructure.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Secure
              </CardTitle>
              <CardDescription>Enterprise-grade security</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Your applications are protected with industry-standard security measures.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Deploy Anything, Anywhere
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          The easiest way to deploy and manage your applications in the cloud. 
          From simple websites to complex applications.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link to="/auth">Get Started Free</Link>
          </Button>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
        <div className="text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Server className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Multiple Platforms</h3>
          <p className="text-muted-foreground">
            Deploy web apps, APIs, databases, Minecraft servers, Discord bots, and more.
          </p>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Zap className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
          <p className="text-muted-foreground">
            Go from code to production in seconds with our optimized deployment pipeline.
          </p>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Real-time Monitoring</h3>
          <p className="text-muted-foreground">
            Monitor your applications with detailed analytics and performance metrics.
          </p>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
        <p className="text-muted-foreground mb-6">
          Join thousands of developers who trust CloudHost for their deployments.
        </p>
        <Button asChild size="lg">
          <Link to="/auth">Start Building Today</Link>
        </Button>
      </div>
    </div>
  );
};

export default Index;
