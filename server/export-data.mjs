import mongoose from 'mongoose';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

async function exportData() {
  try {
    console.log('Connecting to MongoDB...');
    
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000,
    });
    
    console.log('✅ Connected to MongoDB');

    const db = mongoose.connection.db;
    
    // Get all collections
    const collections = await db.listCollections().toArray();
    console.log('Found collections:', collections.map(c => c.name));
    
    const data = {};

    for (const collectionInfo of collections) {
      const collectionName = collectionInfo.name;
      const collection = db.collection(collectionName);
      const docs = await collection.find({}).toArray();
      data[collectionName] = docs;
      console.log(`📦 Exported ${docs.length} documents from ${collectionName}`);
    }

    // Save to JSON file
    fs.writeFileSync('mongodb-export.json', JSON.stringify(data, null, 2));
    console.log('✅ Data exported to mongodb-export.json');
    console.log(`📁 File size: ${(fs.statSync('mongodb-export.json').size / 1024).toFixed(2)} KB`);
    
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Export failed:', error);
    process.exit(1);
  }
}

exportData();