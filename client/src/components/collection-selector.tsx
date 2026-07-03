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
    console.log(hoveredTab);
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
      <div className="bg-card rounded-t-lg px-2 pt-2 flex items-end gap-1 overflow-x-auto">
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
                  ? "bg-background text-foreground border-t-2 border-primary"
                  : "bg-secondary text-muted-foreground hover:bg-accent hover:text-foreground"
              }
            `}
          >
            <span className="truncate flex-1 text-sm font-medium">
              {collection.name}
            </span>
            <span className="text-xs text-muted-foreground">
              ({collection.ratingCount || 0})
            </span>

            {/* Hover Actions */}
            {(
              <div className="flex items-center gap-0.5 ml-1">
                <button
                  onClick={(e) => openEditForm(collection, e)}
                  className="p-1 bg-secondary hover:bg-accent rounded transition-colors"
                  title="Edit collection"
                  disabled={loading}
                >
                  <Edit2 className="w-2 h-2" />
                </button>
                <button
                  onClick={(e) => handleDelete(collection.id, e)}
                  className="p-1 bg-secondary hover:bg-destructive rounded transition-colors"
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
          className="flex items-center gap-2 px-3 py-2 rounded-full bg-card hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
          disabled={loading}
          title="Create new collection"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">New</span>
        </button>
      </div>

      {/* Tab Content Area - Create Form */}
      {showCreateForm && (
      <div className="bg-card border-t-2 border-primary rounded-b-lg p-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">New Collection:</span>
            <input
              type="text"
              placeholder="Collection name (e.g., Movies, Games)"
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
              autoFocus
              className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-foreground text-sm focus:ring-2 focus:ring-ring focus:border-transparent"
            />
            <button
              onClick={handleCreate}
              className="px-4 py-2 bg-primary hover:bg-primary/90 rounded-lg font-medium transition-colors text-primary-foreground text-sm whitespace-nowrap"
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
              className="p-2 hover:bg-secondary rounded-lg transition-colors text-muted-foreground"
              title="Cancel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Tab Content Area - Edit Form */}
      {editingId && (
       <div className="bg-card border-t-2 border-primary rounded-b-lg p-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">Edit Collection:</span>
            <input
              type="text"
              placeholder="Collection name"
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleUpdate()}
              autoFocus
              className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-foreground text-sm focus:ring-2 focus:ring-ring focus:border-transparent"
            />
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-primary hover:bg-primary/90 rounded-lg font-medium transition-colors text-primary-foreground text-sm whitespace-nowrap"
              disabled={loading || !newCollectionName.trim()}
            >
              Save
            </button>
            <button
              onClick={() => {
                setEditingId(null);
                setNewCollectionName("");
                setNewCollectionDesc("");
              }}
              className="p-2 hover:bg-secondary rounded-lg transition-colors text-muted-foreground"
              title="Cancel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* No form showing - just tab bar bottom border */}
      {!showCreateForm && !editingId && (
        <div className="bg-background h-1"></div>
      )}
    </div>
  );
}