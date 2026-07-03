import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { X } from "lucide-react";
import type { Rating } from "../interfaces/rating";
import React from "react";

interface AddRatingProps {
  isOpen: boolean;
  loading: boolean;
  editing: boolean;
  form: Omit<Rating, "id" | "collectionId">;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  setForm: React.Dispatch<React.SetStateAction<Omit<Rating, "id" | "collectionId">>>;
  handleSubmit: () => Promise<void>;
  closeModal: () => void;
}

export default function AddRating({
  isOpen,
  loading,
  editing,
  form,
  handleChange,
  fileInputRef,
  handleImageUpload,
  setForm,
  handleSubmit,
  closeModal,
}: AddRatingProps) {
  if (!isOpen) return null;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setForm({ ...form, rating: value });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-2 sm:p-4"
      onClick={closeModal}
    >
      <div
        className="w-full max-w-xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto bg-card border border-border rounded-xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              {editing ? "Edit Rating" : "Add New Rating"}
            </h2>
            <button
              onClick={closeModal}
              className="border bg-secondary hover:bg-muted rounded-full p-1.5 transition-colors duration-200 shrink-0"
              aria-label="Close"
            >
              <X className="h-5 w-5 text-foreground" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Name
              </label>
              <Input
                name="name"
                placeholder="Item Name"
                value={form.name}
                onChange={handleChange}
                required
                className="bg-muted border-border text-foregroundplaceholder-muted-foreground h-11"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Image
              </label>
              <div className="space-y-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-muted file:text-foregroundhover:file:bg-secondary"
                />
                {form.picture && (
                  <div className="relative bg-muted rounded-lg overflow-hidden w-full aspect-square max-w-[180px] sm:max-w-[200px] mx-auto">
                    <img
                      src={form.picture}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setForm({ ...form, picture: "" });
                        if (fileInputRef.current) {
                          fileInputRef.current.value = "";
                        }
                      }}
                      className="absolute top-2 right-2 bg-[bg-destructive] hover:bg-[hover:bg-destructive/90] text-foregroundrounded-full w-6 h-6 flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Rating:{" "}
                <span className="text-primary font-bold">
                  {form.rating || 0}/10
                </span>
              </label>
              <input
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={form.rating || 0}
                onChange={handleSliderChange}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider-thumb"
                style={{
                  background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${
                    (form.rating / 10) * 100
                  }%, hsl(var(--muted)) ${(form.rating / 10) * 100}%, hsl(var(--muted)) 100%)`,
                }}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Release Date <span className="text-gray-500">(optional)</span>
                </label>
                <Input
                  type="date"
                  name="releaseDate"
                  value={form.releaseDate || ""}
                  onChange={handleChange}
                  className="bg-muted border-border text-foregroundplaceholder-muted-foreground h-11"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Completion Date <span className="text-gray-500">(optional)</span>
                </label>
                <Input
                  type="date"
                  name="completionDate"
                  value={form.completionDate || ""}
                  onChange={handleChange}
                  className="bg-muted border-border text-foregroundplaceholder-muted-foreground h-11"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Review
              </label>
              <Textarea
                name="review"
                placeholder="Write your detailed review or comments..."
                value={form.review}
                onChange={handleChange}
                required
                className="min-h-[18vh] sm:min-h-[22vh] bg-muted border-border text-sm text-foregroundplaceholder-muted-foreground resize-none"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 bg-primary hover:bg-primary/90 text-foregroundh-11"
              >
                {loading
                  ? "Saving..."
                  : editing
                  ? "Update Rating"
                  : "Create Rating"}
              </Button>

              <Button
                onClick={closeModal}
                className="bg-secondary hover:bg-muted text-foregroundh-11"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}