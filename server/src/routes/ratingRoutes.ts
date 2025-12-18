import { Router } from "express";
import { 
  getAllRatings,
  getRatingsByCollection,
  createRating, 
  updateRating, 
  deleteRating 
} from "../controllers/ratingController.js";

const router = Router();

// GET /api/ratings - Get all ratings (across all collections)
router.get("/", getAllRatings);

// GET /api/ratings/collection/:collectionId - Get all ratings for a specific collection
router.get("/collection/:collectionId", getRatingsByCollection);

// POST /api/ratings/collection/:collectionId - Create a new rating in a collection
router.post("/collection/:collectionId", createRating);

// PUT /api/ratings/:id - Update a rating
router.put("/:id", updateRating);

// DELETE /api/ratings/:id - Delete a rating
router.delete("/:id", deleteRating);

export default router;