import mongoose from 'mongoose';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });


async function importData() {
  try {
    console.log('Connecting to MongoDB...');
    
    await mongoose.connect(process.env.MONGO_URI, {
      family: 4,
      serverSelectionTimeoutMS: 30000,
    });
    
    console.log('✅ Connected to MongoDB');

    const data = JSON.parse(fs.readFileSync('mongodb-export.json', 'utf8'));
    const db = mongoose.connection.db;

    console.log('Collections to import:', Object.keys(data));

    for (const [collectionName, docs] of Object.entries(data)) {
      if (docs.length > 0) {
        const collection = db.collection(collectionName);
        await collection.insertMany(docs);
        console.log(`✅ Imported ${docs.length} documents to ${collectionName}`);
      }
    }

    await mongoose.disconnect();
    console.log('🎉 Import complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Import failed:', error);
    process.exit(1);
  }
}

importData();