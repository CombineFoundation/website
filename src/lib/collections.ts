import { Timestamp } from "firebase/firestore";

export interface Program {
  id?: string;
  title: string;
  description: string;
  published: boolean;
  createdAt: Timestamp | Date;
}

export interface Application {
  id?: string;
  userId: string;
  programId: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedAt: Timestamp | Date;
}

export interface Message {
  id?: string;
  name: string;
  email: string;
  message: string;
  sentAt: Timestamp | Date;
}
