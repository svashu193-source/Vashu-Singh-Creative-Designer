export interface Service {
  id: string;
  title: string;
  description: string;
  details: string[];
  iconName: string; // Used to select icons from lucide-react dynamically
  metrics: string; // e.g., "40M+ Views", "8k UHD Rendering"
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Video Editing' | 'Photo Editing' | 'Brand Identity Design' | 'Motion Graphics' | 'Social Media Content';
  mediaUrl: string; // Original video/image
  beforeUrl?: string; // For Photo Editing before/after slider
  afterUrl?: string;  // For Photo Editing before/after slider
  description: string;
  client: string;
  year: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatarUrl: string;
  quote: string;
  rating: number;
}
