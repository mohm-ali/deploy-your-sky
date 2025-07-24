import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Server, 
  DollarSign, 
  TrendingUp, 
  Activity, 
  Users, 
  Settings,
  CreditCard,
  HelpCircle,
  Plus,
  Play,
  Square,
  MoreHorizontal
} from "lucide-react";
import { mockServers } from "@/data/mockServers";
import ProtectedRoute from "@/components/ProtectedRoute";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Dashboard stats
  const totalServers = mockServers.length;
  const runningServers = mockServers.filter(s => s.status === 'running').length;
  const monthlySpend = mockServers.reduce((sum, server) => sum + server.pricing.monthly, 0);
  const cpuUsage = 72; // Mock data
  const storageUsed = 45; // Mock data

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'text-green-500';
      case 'stopped': return 'text-red-500';
      case 'pending': return 'text-yellow-500';
      case 'creating': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'running': return 'default';
      case 'stopped': return 'destructive';
      case 'pending': return 'secondary';
      case 'creating': return 'outline';
      default: return 'secondary';
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Monitor and manage your cloud infrastructure</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="servers" className="flex items-center gap-2">
                <Server className="h-4 w-4" />
                My Servers
              </TabsTrigger>
              <TabsTrigger value="billing" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Billing
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </TabsTrigger>
              <TabsTrigger value="support" className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                Support
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Servers</CardTitle>
                    <Server className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalServers}</div>
                    <p className="text-xs text-muted-foreground">
                      {runningServers} running
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Monthly Spend</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${monthlySpend.toFixed(2)}</div>
                    <p className="text-xs text-muted-foreground">
                      +12% from last month
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{cpuUsage}%</div>
                    <Progress value={cpuUsage} className="mt-2" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{storageUsed}%</div>
                    <Progress value={storageUsed} className="mt-2" />
                  </CardContent>
                </Card>
              </div>

              {/* Recent Servers */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Servers</CardTitle>
                  <CardDescription>Your most recently created servers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockServers.slice(0, 3).map((server) => (
                      <div key={server.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(server.status).replace('text-', 'bg-')}`} />
                          <div>
                            <p className="font-medium">{server.name}</p>
                            <p className="text-sm text-muted-foreground">{server.specs.location}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={getStatusVariant(server.status)}>{server.status}</Badge>
                          <Button size="sm" variant="outline">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="servers" className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">My Servers</h2>
                  <p className="text-muted-foreground">Manage your cloud servers</p>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Server
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {mockServers.map((server) => (
                  <Card key={server.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{server.name}</CardTitle>
                          <CardDescription>{server.description}</CardDescription>
                        </div>
                        <Badge variant={getStatusVariant(server.status)}>{server.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-sm space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Type:</span>
                          <span className="capitalize">{server.server_type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">CPU:</span>
                          <span>{server.specs.cpu} cores</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">RAM:</span>
                          <span>{server.specs.ram} GB</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Storage:</span>
                          <span>{server.specs.storage} GB</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Location:</span>
                          <span>{server.specs.location}</span>
                        </div>
                        <div className="flex justify-between font-medium">
                          <span className="text-muted-foreground">Monthly:</span>
                          <span>${server.pricing.monthly}/mo</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        {server.status === 'running' ? (
                          <Button size="sm" variant="outline">
                            <Square className="h-4 w-4 mr-1" />
                            Stop
                          </Button>
                        ) : (
                          <Button size="sm">
                            <Play className="h-4 w-4 mr-1" />
                            Start
                          </Button>
                        )}
                        <Button size="sm" variant="outline">Settings</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="billing" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Billing & Usage</h2>
                <p className="text-muted-foreground">Monitor your costs and usage</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Current Month</CardTitle>
                    <CardDescription>Usage and costs for this billing period</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Current charges</span>
                      <span className="text-2xl font-bold">${monthlySpend.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Estimated monthly</span>
                      <span>${(monthlySpend * 1.1).toFixed(2)}</span>
                    </div>
                    <Progress value={75} className="mt-4" />
                    <p className="text-sm text-muted-foreground">75% of the billing period elapsed</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                    <CardDescription>Manage your payment information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <CreditCard className="h-8 w-8 text-muted-foreground" />
                      <div>
                        <p className="font-medium">•••• •••• •••• 4242</p>
                        <p className="text-sm text-muted-foreground">Expires 12/25</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">Update Payment Method</Button>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Usage Breakdown</CardTitle>
                  <CardDescription>Cost breakdown by server</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockServers.map((server) => (
                      <div key={server.id} className="flex justify-between items-center p-3 border rounded">
                        <div>
                          <p className="font-medium">{server.name}</p>
                          <p className="text-sm text-muted-foreground">{server.server_type}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${server.pricing.monthly}/mo</p>
                          <p className="text-sm text-muted-foreground">${server.pricing.hourly}/hr</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Account Settings</h2>
                <p className="text-muted-foreground">Manage your account preferences</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your account details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <p className="text-sm text-muted-foreground">user@example.com</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Account Type</label>
                      <p className="text-sm text-muted-foreground">Standard Plan</p>
                    </div>
                    <Button variant="outline">Edit Profile</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Security</CardTitle>
                    <CardDescription>Manage your security settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full">Change Password</Button>
                    <Button variant="outline" className="w-full">Enable 2FA</Button>
                    <Button variant="outline" className="w-full">API Keys</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="support" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Support Center</h2>
                <p className="text-muted-foreground">Get help with your account and services</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Documentation</CardTitle>
                    <CardDescription>Browse our comprehensive guides</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      Getting Started Guide
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Server Management
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      API Documentation
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Troubleshooting
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Contact Support</CardTitle>
                    <CardDescription>Need help? We're here for you</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full">Create Support Ticket</Button>
                    <Button variant="outline" className="w-full">Live Chat</Button>
                    <div className="text-center text-sm text-muted-foreground">
                      <p>Response time: Usually within 2 hours</p>
                      <p>Available 24/7</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;