import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("MongoDB connected");
    
    // Drop problematic indexes (run this once to fix the issue)
    const db = mongoose.connection.db;
    
    try {
      // Drop bad indexes from collections collection
      await db?.collection('collections').dropIndex('id_1');
      console.log('✅ Dropped id_1 index from collections');
    } catch (err) {
      console.log('ℹ️  id_1 index not found (this is OK)');
    }

    try {
      // Also drop name_1 if it exists
      await db?.collection('collections').dropIndex('name_1');
      console.log('✅ Dropped name_1 index from collections');
    } catch (err) {
      console.log('ℹ️  name_1 index not found (this is OK)');
    }
    
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};