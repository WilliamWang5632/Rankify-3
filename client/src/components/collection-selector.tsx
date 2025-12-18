import { useState } from "react";
import type { Collection } from "../interfaces/collection";

interface CollectionSelectorProps {
  collections: Collection[];
  currentCollection: Collection | null;
  setCurrentCollection: (collection: Collection | null) => void;
  createCollection: (name: string, description?: string) => Promise<Collection>;
  updateCollection: (id: string, name: string, description?: string) => Promise<void>;
  deleteCollection: (id: string) => Promise<void>;
  loading: boolean;
}

export default function CollectionSelector({
  collections,
  currentCollection,
  setCurrentCollection,
  createCollection,
  updateCollection,
  deleteCollection,
  loading,
}: CollectionSelectorProps) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [newCollectionDesc, setNewCollectionDesc] = useState("");

  const handleCreate = async () => {
    if (!newCollectionName.trim()) return;

    try {
      const collection = await createCollection(newCollectionName, newCollectionDesc);
      setCurrentCollection(collection);
      setNewCollectionName("");
      setNewCollectionDesc("");
      setShowCreateForm(false);
    } catch (err) {
      // Error handled by hook
    }
  };

  const handleUpdate = async () => {
    if (!currentCollection || !newCollectionName.trim()) return;

    try {
      await updateCollection(currentCollection.id, newCollectionName, newCollectionDesc);
      setNewCollectionName("");
      setNewCollectionDesc("");
      setShowEditForm(false);
    } catch (err) {
      // Error handled by hook
    }
  };

  const handleDelete = async () => {
    if (!currentCollection) return;
    await deleteCollection(currentCollection.id);
  };

  const openEditForm = () => {
    if (!currentCollection) return;
    setNewCollectionName(currentCollection.name);
    setNewCollectionDesc(currentCollection.description || "");
    setShowEditForm(true);
  };

  return (
    <div className="mb-6 bg-gray-800 rounded-lg p-4">
      <div className="flex flex-wrap items-center gap-4">
        {/* Collection Dropdown */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Current Collection
          </label>
          <select
            value={currentCollection?.id || ""}
            onChange={(e) => {
              const collection = collections.find((c) => c.id === e.target.value);
              setCurrentCollection(collection || null);
            }}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          >
            <option value="">Select a collection...</option>
            {collections.map((collection) => (
              <option key={collection.id} value={collection.id}>
                {collection.name} ({collection.ratingCount || 0} ratings)
              </option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 items-end">
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-colors"
            disabled={loading}
          >
            + New
          </button>

          {currentCollection && (
            <>
              <button
                onClick={openEditForm}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
                disabled={loading}
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors"
                disabled={loading}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>

      {/* Create Form */}
      {showCreateForm && (
        <div className="mt-4 p-4 bg-gray-700 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Create New Collection</h3>
          <input
            type="text"
            placeholder="Collection name (e.g., Movies, Games)"
            value={newCollectionName}
            onChange={(e) => setNewCollectionName(e.target.value)}
            className="w-full px-4 py-2 mb-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Description (optional)"
            value={newCollectionDesc}
            onChange={(e) => setNewCollectionDesc(e.target.value)}
            className="w-full px-4 py-2 mb-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 resize-none"
            rows={2}
          />
          <div className="flex gap-2">
            <button
              onClick={handleCreate}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-colors"
              disabled={loading || !newCollectionName.trim()}
            >
              Create
            </button>
            <button
              onClick={() => {
                setShowCreateForm(false);
                setNewCollectionName("");
                setNewCollectionDesc("");
              }}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Edit Form */}
      {showEditForm && currentCollection && (
        <div className="mt-4 p-4 bg-gray-700 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Edit Collection</h3>
          <input
            type="text"
            placeholder="Collection name"
            value={newCollectionName}
            onChange={(e) => setNewCollectionName(e.target.value)}
            className="w-full px-4 py-2 mb-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Description (optional)"
            value={newCollectionDesc}
            onChange={(e) => setNewCollectionDesc(e.target.value)}
            className="w-full px-4 py-2 mb-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 resize-none"
            rows={2}
          />
          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
              disabled={loading || !newCollectionName.trim()}
            >
              Save
            </button>
            <button
              onClick={() => {
                setShowEditForm(false);
                setNewCollectionName("");
                setNewCollectionDesc("");
              }}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}