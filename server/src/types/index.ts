import { Document, Types } from "mongoose";

export interface ICollection extends Document {
  name: string;
  description?: string;
  createdAt?: Date;
}

export interface IRating extends Document {
  collectionId: Types.ObjectId;
  name: string;
  picture?: string;
  rating: number;
  review: string;
  createdAt?: Date;
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}