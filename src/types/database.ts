export interface Program {
  id?: string;
  title: string;
  description: string;
  published: boolean;
  createdAt: any;
}

export interface Application {
  id?: string;
  userId: string;
  programId: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: any;
}

export interface Message {
  id?: string;
  name: string;
  email: string;
  message: string;
  createdAt: any;
}

export interface TeamMember {
  id?: string;
  name: string;
  role: string;
  image: string;
  category: 'founder' | 'ceo' | 'trustee' | 'head' | 'ambassador' | 'leader' | 'partner';
  description?: string[];
  order: number;
}

export interface AnnualReport {
  id?: string;
  title: string;
  description: string;
  image: string;
  viewUrl: string;
  downloadUrl: string;
  order: number;
}

export interface MOU {
  id?: string;
  title: string;
  paragraphs: string[];
  image: string;
  imageAlt: string;
  order: number;
}

export interface Certificate {
  id?: string;
  title: string;
  image: string;
  imageAlt: string;
  url: string;
  order: number;
}

