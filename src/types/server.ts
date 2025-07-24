export interface Server {
  id: string;
  name: string;
  description?: string;
  status: 'pending' | 'creating' | 'running' | 'stopped' | 'error';
  server_type: 'web' | 'api' | 'database' | 'minecraft' | 'discord-bot' | 'vpn' | 'game' | 'ecommerce';
  domain?: string;
  ip_address?: string;
  port?: number;
  specs: {
    cpu: number;
    ram: number; // in GB
    storage: number; // in GB
    location: string;
  };
  os: string;
  pricing: {
    hourly: number;
    monthly: number;
  };
  created_at: string;
  updated_at: string;
}

export interface ServerTemplate {
  id: string;
  name: string;
  type: Server['server_type'];
  description: string;
  icon: string;
  defaultSpecs: {
    cpu: number;
    ram: number;
    storage: number;
  };
  features: string[];
  popular?: boolean;
}