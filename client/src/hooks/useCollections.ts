import { useState, useEffect } from "react";
import type { Collection } from "../interfaces/collection";

export default function useCollections() {
  const API_URL = import.meta.env.VITE_API_URL + "/collections";

  const [collections, setCollections] = useState<Collection[]>([]);
  const [currentCollection, setCurrentCollection] = useState<Collection | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

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

  /* ------------------------------------------------------------------
     Data access helpers
  -------------------------------------------------------------------*/
  const fetchAllCollections = async () => {
    try {
      setLoading(true);
      clearMessages();

      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCollections(Array.isArray(data) ? data : []);
      
      // Set first collection as current if none selected
      if (!currentCollection && data.length > 0) {
        setCurrentCollection(data[0]);
      }
    } catch (err) {
      showError("Failed to fetch collections from server");
      console.error("Fetch error:", err);
      setCollections([]);
    } finally {
      setLoading(false);
    }
  };

  const createCollection = async (name: string, description?: string) => {
    try {
      setLoading(true);
      clearMessages();

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create collection");
      }

      const newCollection = await response.json();
      showSuccess("Collection created successfully!");
      await fetchAllCollections();
      return newCollection;
    } catch (err) {
      showError(err instanceof Error ? err.message : "Failed to create collection");
      console.error("Create collection error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateCollection = async (id: string, name: string, description?: string) => {
    try {
      setLoading(true);
      clearMessages();

      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description }),
      });

      if (!response.ok) {
        throw new Error("Failed to update collection");
      }

      showSuccess("Collection updated successfully!");
      await fetchAllCollections();
    } catch (err) {
      showError("Failed to update collection");
      console.error("Update collection error:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteCollection = async (id: string) => {
    if (!confirm("Are you sure? This will delete all ratings in this collection.")) {
      return;
    }

    try {
      setLoading(true);
      clearMessages();

      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete collection");
      }

      showSuccess("Collection deleted successfully!");
      
      // Clear current collection if it was deleted
      if (currentCollection?.id === id) {
        setCurrentCollection(null);
      }
      
      await fetchAllCollections();
    } catch (err) {
      showError("Failed to delete collection");
      console.error("Delete collection error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchAllCollections();
  }, []);

  return {
    collections,
    currentCollection,
    setCurrentCollection,
    loading,
    error,
    success,
    createCollection,
    updateCollection,
    deleteCollection,
    fetchAllCollections,
    clearMessages,
  };
}