export type Theme = 'dark' | 'light';

export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  year: string;
  description: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum Section {
  HERO = 'hero',
  WORK = 'work',
  ABOUT = 'about',
  CONTACT = 'contact'
}