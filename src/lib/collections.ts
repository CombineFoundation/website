import { Timestamp, FieldValue } from "firebase/firestore";

export interface Program {
  id?: string;
  title: string;
  description: string;
  published: boolean;
  createdAt: Timestamp | Date | FieldValue;
}

export interface Application {
  id?: string;
  userId: string;
  programId: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedAt: Timestamp | Date | FieldValue;
}

export interface Message {
  id?: string;
  name: string;
  email: string;
  message: string;
  sentAt: Timestamp | Date | FieldValue;
}
