import { Request, Response } from "express";
import mongoose from "mongoose";
import { Collection } from "../models/collection.js";
import { Rating } from "../models/rating.js";

export const getAllCollections = async (req: Request, res: Response): Promise<void> => {
  try {
    const collections = await Collection.find().sort({ createdAt: -1 });
    
    // Optionally include rating count for each collection
    const collectionsWithCounts = await Promise.all(
      collections.map(async (collection) => {
        const ratingCount = await Rating.countDocuments({ collectionId: collection._id });
        return {
          ...collection.toJSON(),
          ratingCount
        };
      })
    );
    
    res.json(collectionsWithCounts);
  } catch (err) {
    console.error("Error fetching collections:", err);
    res.status(500).json({ error: "Failed to fetch collections", details: err });
  }
};

export const getCollectionById = async (req: Request, res: Response): Promise<void> => {
  try {
    const collection = await Collection.findById(req.params.id);
    
    if (!collection) {
      res.status(404).json({ error: "Collection not found" });
      return;
    }
    
    res.json(collection);
  } catch (err) {
    console.error("Error fetching collection:", err);
    res.status(500).json({ error: "Failed to fetch collection", details: err });
  }
};

export const createCollection = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.body.name) {
      res.status(400).json({ error: "Collection name is required" });
      return;
    }

    const newCollection = new Collection({
      name: req.body.name.trim(),
      description: req.body.description?.trim() || "",
    });

    const savedCollection = await newCollection.save();
    console.log("Collection created successfully:", savedCollection.id);
    res.status(201).json(savedCollection);
  } catch (err) {
    console.error("Error creating collection:", err);
    if (err instanceof mongoose.Error.ValidationError) {
      res.status(400).json({ 
        error: "Validation error", 
        details: err.message 
      });
    } else if ((err as any).code === 11000) {
      res.status(400).json({ 
        error: "A collection with this name already exists" 
      });
    } else {
      res.status(500).json({ 
        error: "Failed to create collection", 
        details: err 
      });
    }
  }
};

export const updateCollection = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedCollection = await Collection.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name?.trim(),
        description: req.body.description?.trim(),
      },
      { new: true, runValidators: true }
    );

    if (!updatedCollection) {
      res.status(404).json({ error: "Collection not found" });
      return;
    }

    console.log("Collection updated successfully");
    res.json(updatedCollection);
  } catch (err) {
    console.error("Error updating collection:", err);
    res.status(500).json({ error: "Failed to update collection", details: err });
  }
};

export const deleteCollection = async (req: Request, res: Response): Promise<void> => {
  try {
    // Delete all ratings in this collection first
    await Rating.deleteMany({ collectionId: req.params.id });
    
    const deletedCollection = await Collection.findByIdAndDelete(req.params.id);
    
    if (!deletedCollection) {
      res.status(404).json({ error: "Collection not found" });
      return;
    }

    console.log("Collection and its ratings deleted successfully");
    res.json({ message: "Collection deleted successfully" });
  } catch (err) {
    console.error("Error deleting collection:", err);
    res.status(500).json({ error: "Failed to delete collection", details: err });
  }
};