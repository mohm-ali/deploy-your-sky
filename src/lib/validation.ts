import { z } from 'zod';

// Server name validation - alphanumeric, hyphens, underscores only
export const serverNameSchema = z.string()
  .min(1, 'Server name is required')
  .max(63, 'Server name must be 63 characters or less')
  .regex(/^[a-zA-Z0-9][a-zA-Z0-9-_]*[a-zA-Z0-9]$/, 
    'Server name must start and end with alphanumeric characters and contain only letters, numbers, hyphens, and underscores');

// Server description validation 
export const serverDescriptionSchema = z.string()
  .max(500, 'Description must be 500 characters or less')
  .regex(/^[a-zA-Z0-9\s\-_.,!?()]*$/, 
    'Description contains invalid characters');

// CPU validation
export const cpuSchema = z.number()
  .min(1, 'CPU must be at least 1 core')
  .max(32, 'CPU cannot exceed 32 cores');

// RAM validation (in GB)
export const ramSchema = z.number()
  .min(1, 'RAM must be at least 1 GB')
  .max(128, 'RAM cannot exceed 128 GB');

// Storage validation (in GB)
export const storageSchema = z.number()
  .min(10, 'Storage must be at least 10 GB')
  .max(2000, 'Storage cannot exceed 2000 GB');

// Location validation
export const locationSchema = z.enum(['us-east-1', 'us-west-2', 'eu-west-1', 'ap-southeast-1'], {
  message: 'Invalid location selected'
});

// OS validation
export const osSchema = z.enum(['ubuntu-20.04', 'ubuntu-22.04', 'centos-7', 'debian-11'], {
  message: 'Invalid operating system selected'
});

// Complete server creation schema
export const createServerSchema = z.object({
  name: serverNameSchema,
  description: serverDescriptionSchema.optional(),
  cpu: cpuSchema,
  ram: ramSchema,
  storage: storageSchema,
  location: locationSchema,
  os: osSchema,
});

export type CreateServerInput = z.infer<typeof createServerSchema>;

// Sanitize user input by removing potentially dangerous characters
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>"/\\&']/g, '') // Remove common injection characters
    .substring(0, 1000); // Limit length
};

// Validate and sanitize server creation input
export const validateServerInput = (input: any): CreateServerInput => {
  // Sanitize string inputs first
  const sanitized = {
    ...input,
    name: typeof input.name === 'string' ? sanitizeInput(input.name) : input.name,
    description: typeof input.description === 'string' ? sanitizeInput(input.description) : input.description,
  };

  // Then validate with schema
  return createServerSchema.parse(sanitized);
};