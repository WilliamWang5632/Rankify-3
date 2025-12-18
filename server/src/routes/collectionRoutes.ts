import { Router } from "express";
import { 
  getAllCollections,
  getCollectionById,
  createCollection, 
  updateCollection, 
  deleteCollection 
} from "../controllers/collectionController.js";

const router = Router();

// GET /api/collections - Get all collections
router.get("/", getAllCollections);

// GET /api/collections/:id - Get a specific collection
router.get("/:id", getCollectionById);

// POST /api/collections - Create a new collection
router.post("/", createCollection);

// PUT /api/collections/:id - Update a collection
router.put("/:id", updateCollection);

// DELETE /api/collections/:id - Delete a collection
router.delete("/:id", deleteCollection);

export default router;