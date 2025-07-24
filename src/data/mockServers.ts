import { Server, ServerTemplate } from '@/types/server';

export const mockServers: Server[] = [
  {
    id: '1',
    name: 'Personal Website',
    description: 'My portfolio website built with React',
    status: 'running',
    server_type: 'web',
    domain: 'mysite.cloudhost.dev',
    ip_address: '192.168.1.100',
    port: 80,
    specs: {
      cpu: 1,
      ram: 2,
      storage: 20,
      location: 'US East'
    },
    os: 'Ubuntu 22.04',
    pricing: {
      hourly: 0.05,
      monthly: 25
    },
    created_at: '2024-01-15T10:30:00Z',
    updated_at: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'E-commerce API',
    description: 'Backend API for online store',
    status: 'running',
    server_type: 'api',
    domain: 'api.mystore.com',
    ip_address: '192.168.1.101',
    port: 3000,
    specs: {
      cpu: 2,
      ram: 4,
      storage: 50,
      location: 'EU West'
    },
    os: 'Ubuntu 22.04',
    pricing: {
      hourly: 0.12,
      monthly: 75
    },
    created_at: '2024-01-10T14:20:00Z',
    updated_at: '2024-01-20T09:15:00Z'
  },
  {
    id: '3',
    name: 'Minecraft Survival',
    description: 'Private Minecraft server for friends',
    status: 'running',
    server_type: 'minecraft',
    ip_address: '192.168.1.102',
    port: 25565,
    specs: {
      cpu: 4,
      ram: 8,
      storage: 100,
      location: 'US West'
    },
    os: 'Ubuntu 22.04',
    pricing: {
      hourly: 0.25,
      monthly: 150
    },
    created_at: '2024-01-05T16:45:00Z',
    updated_at: '2024-01-22T11:30:00Z'
  },
  {
    id: '4',
    name: 'PostgreSQL Database',
    description: 'Production database for web apps',
    status: 'stopped',
    server_type: 'database',
    ip_address: '192.168.1.103',
    port: 5432,
    specs: {
      cpu: 2,
      ram: 8,
      storage: 200,
      location: 'US East'
    },
    os: 'Ubuntu 22.04',
    pricing: {
      hourly: 0.18,
      monthly: 110
    },
    created_at: '2024-01-12T08:00:00Z',
    updated_at: '2024-01-23T15:20:00Z'
  },
  {
    id: '5',
    name: 'VPN Gateway',
    description: 'Secure VPN server for remote access',
    status: 'creating',
    server_type: 'vpn',
    specs: {
      cpu: 1,
      ram: 2,
      storage: 20,
      location: 'EU Central'
    },
    os: 'Ubuntu 22.04',
    pricing: {
      hourly: 0.08,
      monthly: 45
    },
    created_at: '2024-01-24T12:00:00Z',
    updated_at: '2024-01-24T12:00:00Z'
  }
];

export const serverTemplates: ServerTemplate[] = [
  {
    id: 'web',
    name: 'Web Application',
    type: 'web',
    description: 'Perfect for hosting websites, React apps, and static sites',
    icon: '🌐',
    defaultSpecs: {
      cpu: 1,
      ram: 2,
      storage: 20
    },
    features: ['SSL Certificates', 'Custom Domains', 'CDN', 'Auto-scaling'],
    popular: true
  },
  {
    id: 'api',
    name: 'API Server',
    type: 'api',
    description: 'Ideal for REST APIs, GraphQL endpoints, and microservices',
    icon: '🔗',
    defaultSpecs: {
      cpu: 2,
      ram: 4,
      storage: 50
    },
    features: ['Load Balancing', 'Auto-scaling', 'Rate Limiting', 'Health Checks']
  },
  {
    id: 'database',
    name: 'Database Server',
    type: 'database',
    description: 'Managed databases with automated backups and monitoring',
    icon: '🗃️',
    defaultSpecs: {
      cpu: 2,
      ram: 8,
      storage: 100
    },
    features: ['Automated Backups', 'Point-in-time Recovery', 'Monitoring', 'Read Replicas']
  },
  {
    id: 'minecraft',
    name: 'Minecraft Server',
    type: 'minecraft',
    description: 'Pre-configured Minecraft servers with mod support',
    icon: '🎮',
    defaultSpecs: {
      cpu: 4,
      ram: 8,
      storage: 100
    },
    features: ['Mod Support', 'World Backups', 'Player Management', 'Performance Monitoring'],
    popular: true
  },
  {
    id: 'discord-bot',
    name: 'Discord Bot',
    type: 'discord-bot',
    description: 'Host your Discord bots with 24/7 uptime',
    icon: '🤖',
    defaultSpecs: {
      cpu: 1,
      ram: 1,
      storage: 10
    },
    features: ['24/7 Uptime', 'Auto-restart', 'Log Management', 'Easy Deployment']
  },
  {
    id: 'vpn',
    name: 'VPN Server',
    type: 'vpn',
    description: 'Secure VPN servers for privacy and remote access',
    icon: '🔒',
    defaultSpecs: {
      cpu: 1,
      ram: 2,
      storage: 20
    },
    features: ['WireGuard & OpenVPN', 'Multi-device Support', 'Kill Switch', 'No Logs Policy']
  },
  {
    id: 'game',
    name: 'Game Server',
    type: 'game',
    description: 'Optimized servers for various multiplayer games',
    icon: '🎯',
    defaultSpecs: {
      cpu: 4,
      ram: 8,
      storage: 100
    },
    features: ['Game-specific Optimization', 'DDoS Protection', 'Mod Support', 'Automated Updates']
  },
  {
    id: 'ecommerce',
    name: 'E-commerce Platform',
    type: 'ecommerce',
    description: 'Complete e-commerce solution with payment processing',
    icon: '🛒',
    defaultSpecs: {
      cpu: 2,
      ram: 4,
      storage: 100
    },
    features: ['Payment Integration', 'Inventory Management', 'Analytics', 'SEO Optimization']
  }
];

export const locations = [
  { id: 'us-east', name: 'US East (Virginia)', flag: '🇺🇸' },
  { id: 'us-west', name: 'US West (Oregon)', flag: '🇺🇸' },
  { id: 'eu-west', name: 'EU West (Ireland)', flag: '🇮🇪' },
  { id: 'eu-central', name: 'EU Central (Frankfurt)', flag: '🇩🇪' },
  { id: 'ap-southeast', name: 'Asia Pacific (Singapore)', flag: '🇸🇬' },
  { id: 'ap-northeast', name: 'Asia Pacific (Tokyo)', flag: '🇯🇵' }
];

export const operatingSystems = [
  { id: 'ubuntu-22.04', name: 'Ubuntu 22.04 LTS', icon: '🐧' },
  { id: 'ubuntu-20.04', name: 'Ubuntu 20.04 LTS', icon: '🐧' },
  { id: 'debian-11', name: 'Debian 11', icon: '🌀' },
  { id: 'centos-8', name: 'CentOS 8', icon: '🔴' },
  { id: 'windows-2019', name: 'Windows Server 2019', icon: '🪟' },
  { id: 'windows-2022', name: 'Windows Server 2022', icon: '🪟' }
];