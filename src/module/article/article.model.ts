import * as mongoose from 'mongoose';

export const ArticleSchema = new mongoose.Schema({
  title: String,
  author: String,
  content: String,
  createdAt: String,
  updatedAt: String,
  keywords: [],
});
