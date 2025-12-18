import { useState } from "react";
import { X, Plus, Edit2 } from "lucide-react";
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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [newCollectionDesc, setNewCollectionDesc] = useState("");
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

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
    if (!editingId || !newCollectionName.trim()) return;

    try {
      await updateCollection(editingId, newCollectionName, newCollectionDesc);
      setNewCollectionName("");
      setNewCollectionDesc("");
      setEditingId(null);
    } catch (err) {
      // Error handled by hook
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await deleteCollection(id);
  };

  const openEditForm = (collection: Collection, e: React.MouseEvent) => {
    e.stopPropagation();
    setNewCollectionName(collection.name);
    setNewCollectionDesc(collection.description || "");
    setEditingId(collection.id);
  };

  return (
    <div className="mb-3">
      {/* Tab Bar */}
      <div className="bg-gray-800 rounded-t-lg px-2 pt-2 flex items-end gap-1 overflow-x-auto">
        {/* Collection Tabs */}
        {collections.map((collection) => (
          <div
            key={collection.id}
            onMouseEnter={() => setHoveredTab(collection.id)}
            onMouseLeave={() => setHoveredTab(null)}
            onClick={() => setCurrentCollection(collection)}
            className={`
              group relative flex items-center gap-2 px-2 py-2 rounded-t-lg cursor-pointer
              transition-all duration-200 min-w-[120px] max-w-[200px]
              ${
                currentCollection?.id === collection.id
                  ? "bg-gray-900 text-white border-t-2 border-indigo-500"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-650 hover:text-white"
              }
            `}
          >
            <span className="truncate flex-1 text-sm font-medium">
              {collection.name}
            </span>
            <span className="text-xs text-gray-400">
              ({collection.ratingCount || 0})
            </span>

            {/* Hover Actions */}
            {(
              <div className="flex items-center gap-0.5 ml-1">
                <button
                  onClick={(e) => openEditForm(collection, e)}
                  className="p-1 hover:bg-gray-700 rounded transition-colors"
                  title="Edit collection"
                  disabled={loading}
                >
                  <Edit2 className="w-2 h-2" />
                </button>
                <button
                  onClick={(e) => handleDelete(collection.id, e)}
                  className="p-1 hover:bg-red-600 rounded transition-colors"
                  title="Delete collection"
                  disabled={loading}
                >
                  <X className="w-2 h-2" />
                </button>
              </div>
            )}
          </div>
        ))}

        {/* New Tab Button */}
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
          disabled={loading}
          title="Create new collection"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">New</span>
        </button>
      </div>

      {/* Tab Content Area - Create Form */}
      {showCreateForm && (
        <div className="bg-gray-800 border-t-2 border-indigo-500 rounded-b-lg p-4">
          <div className="max-w-2xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-white">Create New Collection</h3>
              <button
                onClick={() => {
                  setShowCreateForm(false);
                  setNewCollectionName("");
                  setNewCollectionDesc("");
                }}
                className="p-1 hover:bg-gray-700 rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <input
              type="text"
              placeholder="Collection name (e.g., Movies, Games)"
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
              autoFocus
              className="w-full px-4 py-2 mb-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <textarea
              placeholder="Description (optional)"
              value={newCollectionDesc}
              onChange={(e) => setNewCollectionDesc(e.target.value)}
              className="w-full px-4 py-2 mb-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              rows={2}
            />
            <div className="flex gap-2">
              <button
                onClick={handleCreate}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium transition-colors text-white"
                disabled={loading || !newCollectionName.trim()}
              >
                Create Collection
              </button>
              <button
                onClick={() => {
                  setShowCreateForm(false);
                  setNewCollectionName("");
                  setNewCollectionDesc("");
                }}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-colors text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content Area - Edit Form */}
      {editingId && (
        <div className="bg-gray-800 border-t-2 border-indigo-500 rounded-b-lg p-4">
          <div className="max-w-2xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-white">Edit Collection</h3>
              <button
                onClick={() => {
                  setEditingId(null);
                  setNewCollectionName("");
                  setNewCollectionDesc("");
                }}
                className="p-1 hover:bg-gray-700 rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <input
              type="text"
              placeholder="Collection name"
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleUpdate()}
              autoFocus
              className="w-full px-4 py-2 mb-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <textarea
              placeholder="Description (optional)"
              value={newCollectionDesc}
              onChange={(e) => setNewCollectionDesc(e.target.value)}
              className="w-full px-4 py-2 mb-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              rows={2}
            />
            <div className="flex gap-2">
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium transition-colors text-white"
                disabled={loading || !newCollectionName.trim()}
              >
                Save Changes
              </button>
              <button
                onClick={() => {
                  setEditingId(null);
                  setNewCollectionName("");
                  setNewCollectionDesc("");
                }}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-colors text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* No form showing - just tab bar bottom border */}
      {!showCreateForm && !editingId && (
        <div className="bg-gray-900 h-1"></div>
      )}
    </div>
  );
}