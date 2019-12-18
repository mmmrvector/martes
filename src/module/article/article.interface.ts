import { Document } from 'mongoose';

export interface Article extends Document {
  title: string;
  author: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  keywords: [];
}
