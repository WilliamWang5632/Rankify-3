import mongoose, { Schema } from "mongoose";
import { IRating } from "../types/index.js";

const RatingSchema = new Schema<IRating>(
  {
    collectionId: { type: Schema.Types.ObjectId, ref: "Collection", required: true },
    name: { type: String, required: true },
    picture: { type: String },
    rating: { type: Number, required: true, min: 0, max: 10 },
    review: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { 
    collection: "ratings",
    toJSON: { 
      transform: function(doc: any, ret: any) {
        ret.id = ret._id?.toString();
        ret.collectionId = ret.collectionId?.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  }
);

// Index for faster queries by collection
RatingSchema.index({ collectionId: 1, createdAt: -1 });

export const Rating = mongoose.model<IRating>("Rating", RatingSchema);