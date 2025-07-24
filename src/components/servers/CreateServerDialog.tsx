import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { serverTemplates, locations, operatingSystems } from '@/data/mockServers';
import { ServerTemplate } from '@/types/server';
import { useToast } from '@/hooks/use-toast';

interface CreateServerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateServerDialog = ({ open, onOpenChange }: CreateServerDialogProps) => {
  const [step, setStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState<ServerTemplate | null>(null);
  const [serverName, setServerName] = useState('');
  const [serverDescription, setServerDescription] = useState('');
  const [cpu, setCpu] = useState([2]);
  const [ram, setRam] = useState([4]);
  const [storage, setStorage] = useState([50]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedOS, setSelectedOS] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);
  const { toast } = useToast();

  const calculatePricing = () => {
    const baseCost = 0.02; // Base cost per hour
    const cpuCost = cpu[0] * 0.015;
    const ramCost = ram[0] * 0.008;
    const storageCost = storage[0] * 0.0001;
    const hourly = baseCost + cpuCost + ramCost + storageCost;
    const monthly = hourly * 24 * 30;
    
    return {
      hourly: parseFloat(hourly.toFixed(3)),
      monthly: parseFloat(monthly.toFixed(2))
    };
  };

  const handleTemplateSelect = (template: ServerTemplate) => {
    setSelectedTemplate(template);
    setCpu([template.defaultSpecs.cpu]);
    setRam([template.defaultSpecs.ram]);
    setStorage([template.defaultSpecs.storage]);
    setServerName(`${template.name} Server`);
    setStep(2);
  };

  const handleDeploy = async () => {
    setIsDeploying(true);
    
    // Simulate deployment process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Server Created!",
      description: `${serverName} is being deployed. This may take a few minutes.`,
    });
    
    setIsDeploying(false);
    onOpenChange(false);
    resetForm();
  };

  const resetForm = () => {
    setStep(1);
    setSelectedTemplate(null);
    setServerName('');
    setServerDescription('');
    setCpu([2]);
    setRam([4]);
    setStorage([50]);
    setSelectedLocation('');
    setSelectedOS('');
  };

  const pricing = calculatePricing();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Server</DialogTitle>
          <DialogDescription>
            Choose a template and configure your server specifications
          </DialogDescription>
        </DialogHeader>

        <Tabs value={step.toString()} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="1">Choose Template</TabsTrigger>
            <TabsTrigger value="2" disabled={!selectedTemplate}>Configure</TabsTrigger>
            <TabsTrigger value="3" disabled={step < 3}>Deploy</TabsTrigger>
          </TabsList>

          <TabsContent value="1" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {serverTemplates.map((template) => (
                <Card 
                  key={template.id} 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    template.popular ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => handleTemplateSelect(template)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">{template.icon}</span>
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                      </div>
                      {template.popular && (
                        <Badge className="bg-primary text-primary-foreground">Popular</Badge>
                      )}
                    </div>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">
                        Default specs: {template.defaultSpecs.cpu} vCPU, {template.defaultSpecs.ram}GB RAM, {template.defaultSpecs.storage}GB Storage
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {template.features.slice(0, 2).map((feature) => (
                          <Badge key={feature} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {template.features.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{template.features.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="2" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Server Name</Label>
                  <Input
                    id="name"
                    value={serverName}
                    onChange={(e) => setServerName(e.target.value)}
                    placeholder="Enter server name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    value={serverDescription}
                    onChange={(e) => setServerDescription(e.target.value)}
                    placeholder="Describe your server"
                    rows={3}
                  />
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>CPU Cores: {cpu[0]} vCPU</Label>
                    <Slider
                      value={cpu}
                      onValueChange={setCpu}
                      max={16}
                      min={1}
                      step={1}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Memory: {ram[0]} GB RAM</Label>
                    <Slider
                      value={ram}
                      onValueChange={setRam}
                      max={64}
                      min={1}
                      step={1}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Storage: {storage[0]} GB SSD</Label>
                    <Slider
                      value={storage}
                      onValueChange={setStorage}
                      max={1000}
                      min={10}
                      step={10}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Location</Label>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location.id} value={location.id}>
                          {location.flag} {location.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Operating System</Label>
                  <Select value={selectedOS} onValueChange={setSelectedOS}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an OS" />
                    </SelectTrigger>
                    <SelectContent>
                      {operatingSystems.map((os) => (
                        <SelectItem key={os.id} value={os.id}>
                          {os.icon} {os.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Configuration Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedTemplate && (
                      <div className="flex items-center space-x-2">
                        <span className="text-xl">{selectedTemplate.icon}</span>
                        <span className="font-medium">{selectedTemplate.name}</span>
                      </div>
                    )}
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>CPU:</span>
                        <span>{cpu[0]} vCPU</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Memory:</span>
                        <span>{ram[0]} GB RAM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Storage:</span>
                        <span>{storage[0]} GB SSD</span>
                      </div>
                      {selectedLocation && (
                        <div className="flex justify-between">
                          <span>Location:</span>
                          <span>{locations.find(l => l.id === selectedLocation)?.name}</span>
                        </div>
                      )}
                      {selectedOS && (
                        <div className="flex justify-between">
                          <span>OS:</span>
                          <span>{operatingSystems.find(os => os.id === selectedOS)?.name}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Pricing</CardTitle>
                    <CardDescription>Pay-as-you-go pricing</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Hourly:</span>
                        <span className="font-bold">${pricing.hourly}/hr</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Monthly estimate:</span>
                        <span className="font-bold text-lg">${pricing.monthly}/mo</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Button 
                  onClick={() => setStep(3)} 
                  className="w-full"
                  disabled={!serverName || !selectedLocation || !selectedOS}
                >
                  Continue to Deploy
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="3" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Ready to Deploy</CardTitle>
                <CardDescription>
                  Review your configuration and deploy your server
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Server Name:</span>
                    <p className="text-muted-foreground">{serverName}</p>
                  </div>
                  <div>
                    <span className="font-medium">Template:</span>
                    <p className="text-muted-foreground">{selectedTemplate?.name}</p>
                  </div>
                  <div>
                    <span className="font-medium">Specifications:</span>
                    <p className="text-muted-foreground">
                      {cpu[0]} vCPU, {ram[0]}GB RAM, {storage[0]}GB SSD
                    </p>
                  </div>
                  <div>
                    <span className="font-medium">Monthly Cost:</span>
                    <p className="text-muted-foreground font-bold">${pricing.monthly}/mo</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex gap-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setStep(2)}
                      disabled={isDeploying}
                    >
                      Back to Configure
                    </Button>
                    <Button 
                      onClick={handleDeploy}
                      disabled={isDeploying}
                      className="flex-1"
                    >
                      {isDeploying ? 'Deploying...' : 'Deploy Server'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default CreateServerDialog;