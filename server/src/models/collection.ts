import mongoose, { Schema } from "mongoose";
import { ICollection } from "../types/index.js";

const CollectionSchema = new Schema<ICollection>(
  {
    name: { type: String, required: true },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { 
    collection: "collections",
    autoIndex: true,
    toJSON: { 
      transform: function(doc: any, ret: any) {
        ret.id = ret._id?.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  }
);

// export const Collection = mongoose.model<ICollection>("Collection", CollectionSchema);
//   { 
//     collection: "collections",
//     toJSON: { 
//       transform: function(doc: any, ret: any) {
//         ret.id = ret._id?.toString();
//         delete ret._id;
//         delete ret.__v;
//         return ret;
//       }
//     }
//   }
// );

export const Collection = mongoose.model<ICollection>("Collection", CollectionSchema);