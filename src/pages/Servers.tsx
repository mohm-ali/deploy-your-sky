import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  Server, 
  Plus, 
  Search, 
  Play, 
  Square, 
  Trash2, 
  Settings, 
  ExternalLink,
  Monitor,
  HardDrive,
  Cpu,
  MemoryStick
} from 'lucide-react';
import { mockServers } from '@/data/mockServers';
import ProtectedRoute from '@/components/ProtectedRoute';
import CreateServerDialog from '@/components/servers/CreateServerDialog';

const Servers = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-green-500';
      case 'stopped': return 'bg-red-500';
      case 'creating': return 'bg-yellow-500';
      case 'pending': return 'bg-blue-500';
      case 'error': return 'bg-destructive';
      default: return 'bg-muted';
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'running': return 'default';
      case 'stopped': return 'destructive';
      case 'creating': return 'secondary';
      case 'pending': return 'outline';
      case 'error': return 'destructive';
      default: return 'secondary';
    }
  };

  const filteredServers = mockServers.filter(server => {
    const matchesSearch = server.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         server.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || server.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const serverCounts = {
    all: mockServers.length,
    running: mockServers.filter(s => s.status === 'running').length,
    stopped: mockServers.filter(s => s.status === 'stopped').length,
    creating: mockServers.filter(s => s.status === 'creating').length,
    error: mockServers.filter(s => s.status === 'error').length
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Servers</h1>
            <p className="text-muted-foreground">
              Manage and monitor your cloud infrastructure
            </p>
          </div>
          <Button onClick={() => setShowCreateDialog(true)} size="lg">
            <Plus className="h-4 w-4 mr-2" />
            Create Server
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">Running</span>
              </div>
              <p className="text-2xl font-bold mt-1">{serverCounts.running}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-sm font-medium">Stopped</span>
              </div>
              <p className="text-2xl font-bold mt-1">{serverCounts.stopped}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm font-medium">Creating</span>
              </div>
              <p className="text-2xl font-bold mt-1">{serverCounts.creating}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Server className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Total</span>
              </div>
              <p className="text-2xl font-bold mt-1">{serverCounts.all}</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search servers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Tabs value={selectedStatus} onValueChange={setSelectedStatus} className="w-auto">
            <TabsList>
              <TabsTrigger value="all">All ({serverCounts.all})</TabsTrigger>
              <TabsTrigger value="running">Running ({serverCounts.running})</TabsTrigger>
              <TabsTrigger value="stopped">Stopped ({serverCounts.stopped})</TabsTrigger>
              <TabsTrigger value="creating">Creating ({serverCounts.creating})</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Servers Grid */}
        <div className="grid gap-6">
          {filteredServers.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Server className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No servers found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm ? 'Try adjusting your search terms' : 'Create your first server to get started'}
                </p>
                {!searchTerm && (
                  <Button onClick={() => setShowCreateDialog(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Server
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            filteredServers.map((server) => (
              <Card key={server.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(server.status)} mt-2`}></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <CardTitle className="text-lg">{server.name}</CardTitle>
                          <Badge variant={getStatusVariant(server.status)} className="capitalize">
                            {server.status}
                          </Badge>
                          <Badge variant="outline" className="capitalize">
                            {server.server_type.replace('-', ' ')}
                          </Badge>
                        </div>
                        {server.description && (
                          <CardDescription>{server.description}</CardDescription>
                        )}
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-2">
                          {server.domain && (
                            <div className="flex items-center space-x-1">
                              <ExternalLink className="h-3 w-3" />
                              <span>{server.domain}</span>
                            </div>
                          )}
                          {server.ip_address && (
                            <div className="flex items-center space-x-1">
                              <Monitor className="h-3 w-3" />
                              <span>{server.ip_address}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {server.status === 'running' && (
                        <Button variant="outline" size="sm">
                          <Square className="h-3 w-3 mr-1" />
                          Stop
                        </Button>
                      )}
                      {server.status === 'stopped' && (
                        <Button variant="outline" size="sm">
                          <Play className="h-3 w-3 mr-1" />
                          Start
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <Settings className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Cpu className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{server.specs.cpu} vCPU</p>
                        <p className="text-xs text-muted-foreground">CPU Cores</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MemoryStick className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{server.specs.ram} GB</p>
                        <p className="text-xs text-muted-foreground">Memory</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <HardDrive className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{server.specs.storage} GB</p>
                        <p className="text-xs text-muted-foreground">Storage</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">${server.pricing.monthly}/mo</p>
                      <p className="text-xs text-muted-foreground">${server.pricing.hourly}/hr</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{server.os} • {server.specs.location}</span>
                    <span>Created {new Date(server.created_at).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <CreateServerDialog 
          open={showCreateDialog} 
          onOpenChange={setShowCreateDialog}
        />
      </div>
    </ProtectedRoute>
  );
};

export default Servers;