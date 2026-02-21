export interface ModuleData {
  id: string;
  name: string;
  code: string;
  slogan: string;
  description: string;
  features: string[];
  status: 'ONLINE' | 'INCUBATING' | 'OFFLINE';
  action: string;
}

export interface LogEntry {
  version: string;
  module: string;
  content: string;
  date?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  tags: string[];
  coverImage?: string;
  status: 'draft' | 'published';
}