import { useState, useRef, useEffect } from "react";
import type { ChangeEvent } from "react";
import type { Rating } from "../interfaces/rating";

const blank: Omit<Rating, "id" | "collectionId"> = {
  name: "",
  picture: "",
  rating: 0,
  review: "",
};

export interface Stats {
  totalRatings: number;
  meanRating: number;
  medianRating: number;
  highestRating: number;
  lowestRating: number;
}

interface UseRatingProps {
  collectionId: string | null;
}

export default function useRating({ collectionId }: UseRatingProps) {
  const API_URL = import.meta.env.VITE_API_URL + "/ratings";
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [items, setItems] = useState<Rating[]>([]);
  const [form, setForm] = useState<Omit<Rating, "id" | "collectionId">>(blank);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<
    "name" | "name-desc" | "rating" | "rating-low" | "newest" | "oldest"
  >("newest");
  const [isFormExpanded, setIsFormExpanded] = useState(false);

  /* ------------------------------------------------------------------
     Utility functions
  -------------------------------------------------------------------*/
  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  const showSuccess = (message: string) => {
    setSuccess(message);
    setTimeout(() => setSuccess(""), 3000);
  };

  const showError = (message: string) => {
    setError(message);
    setTimeout(() => setError(""), 5000);
  };

  const convertFileToDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Calculate statistics
  const getStats = (): Stats => {
    if (items.length === 0) {
      return {
        totalRatings: 0,
        meanRating: 0,
        medianRating: 0,
        highestRating: 0,
        lowestRating: 0,
      };
    }

    const ratings = items.map((item) => item.rating);
    const totalRatings = items.length;
    const meanRating =
      ratings.reduce((sum, rating) => sum + rating, 0) / totalRatings;

    // Calculate median
    const sortedRatings = [...ratings].sort((a, b) => a - b);
    const medianRating =
      sortedRatings.length % 2 === 0
        ? (sortedRatings[sortedRatings.length / 2 - 1] +
            sortedRatings[sortedRatings.length / 2]) /
          2
        : sortedRatings[Math.floor(sortedRatings.length / 2)];

    const highestRating = Math.max(...ratings);
    const lowestRating = Math.min(...ratings);

    return {
      totalRatings,
      meanRating,
      medianRating,
      highestRating,
      lowestRating,
    };
  };

  /* ------------------------------------------------------------------
     Data access helpers
  -------------------------------------------------------------------*/
  const fetchAll = async () => {
    if (!collectionId) {
      setItems([]);
      return;
    }

    try {
      setLoading(true);
      clearMessages();

      const response = await fetch(`${API_URL}/collection/${collectionId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      showError("Failed to fetch ratings from server");
      console.error("Fetch error:", err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const createRating = async (rating: Omit<Rating, "id" | "collectionId">) => {
    if (!collectionId) {
      throw new Error("No collection selected");
    }

    const response = await fetch(`${API_URL}/collection/${collectionId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...rating,
        createdAt: new Date().toISOString().split("T")[0],
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  };

  const updateRating = async (
    id: string,
    rating: Partial<Omit<Rating, "id" | "collectionId">>
  ) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rating),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  };

  const deleteRating = async (id: string) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  };

  // Fetch ratings when collection changes
  useEffect(() => {
    void fetchAll();
  }, [collectionId]);

  /* ------------------------------------------------------------------
     Filtering and sorting
  -------------------------------------------------------------------*/
  const filteredAndSortedItems = items
    .filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.review.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "rating":
          return b.rating - a.rating;
        case "rating-low":
          return a.rating - b.rating;
        case "newest":
          return (b.createdAt || b.id).localeCompare(a.createdAt || a.id);
        case "oldest":
          return (a.createdAt || a.id).localeCompare(b.createdAt || b.id);
        default:
          return 0;
      }
    });

  /* ------------------------------------------------------------------
     Handlers
  -------------------------------------------------------------------*/
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "rating") {
      const numValue = parseFloat(value);
      if (!isNaN(numValue) && numValue >= 0 && numValue <= 10) {
        setForm({ ...form, [name]: numValue });
      }
    } else {
      setForm({ ...form, [name]: value });
    }

    clearMessages();
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      showError("Please select a valid image file");
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      showError("Image size must be less than 5MB");
      return;
    }

    try {
      const compressedDataURL = await compressImage(file);
      setForm({ ...form, picture: compressedDataURL });
      clearMessages();
    } catch (err) {
      showError("Failed to process image");
      console.error("Image upload error:", err);
    }
  };

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          // Set max dimensions
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;

          let width = img.width;
          let height = img.height;

          // Calculate new dimensions while maintaining aspect ratio
          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;

          // Draw and compress
          ctx?.drawImage(img, 0, 0, width, height);

          // Convert to compressed dataURL (0.8 quality for JPEG)
          const compressedDataURL = canvas.toDataURL("image/jpeg", 0.8);
          resolve(compressedDataURL);
        };

        img.onerror = () => reject(new Error("Failed to load image"));
      };

      reader.onerror = () => reject(new Error("Failed to read file"));
    });
  };

  const validateForm = (): boolean => {
    if (!collectionId) {
      showError("Please select a collection first");
      return false;
    }
    if (!form.name.trim()) {
      showError("Name is required");
      return false;
    }
    if (form.rating < 0 || form.rating > 10) {
      showError("Rating must be between 0 and 10");
      return false;
    }
    if (!form.review.trim()) {
      showError("Review is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      clearMessages();

      if (editingId) {
        await updateRating(editingId, form);
        showSuccess("Rating updated successfully!");
      } else {
        await createRating(form);
        showSuccess("Rating created successfully!");
      }

      await fetchAll();
      setForm(blank);
      setEditingId(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      showError(
        `Failed to ${editingId ? "update" : "create"} rating. Please try again.`
      );
      console.error("Save error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: Rating) => {
    setForm({
      name: item.name,
      picture: item.picture,
      rating: item.rating,
      review: item.review,
    });
    setEditingId(item.id);
    clearMessages();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this rating?")) {
      return;
    }

    try {
      setLoading(true);
      await deleteRating(id);
      showSuccess("Rating deleted successfully!");
      await fetchAll();
    } catch (err) {
      showError("Failed to delete rating. Please try again.");
      console.error("Delete error:", err);
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setForm(blank);
    setEditingId(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    clearMessages();
  };

  return {
    // State
    items,
    form,
    editing: editingId !== null,
    editingId,
    loading,
    error,
    success,
    searchTerm,
    sortBy,
    filteredAndSortedItems,

    // Functions
    handleChange,
    handleImageUpload,
    handleSubmit,
    handleEdit,
    handleDelete,
    cancelEdit,
    setSearchTerm,
    setSortBy,
    setForm,
    getStats,
    fileInputRef,
    blank,
    clearMessages,
    isFormExpanded,
    setIsFormExpanded,
  };
}
