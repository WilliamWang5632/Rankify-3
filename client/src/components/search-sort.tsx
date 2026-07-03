import { Card, CardContent } from "./ui/card"
import { Input } from "./ui/input"
import { LayoutGrid, List } from "lucide-react"
import type { SortOption, ViewMode } from "../hooks/useRating"

export default function SearchSort({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
}: {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  sortBy: SortOption;
  setSortBy: React.Dispatch<React.SetStateAction<SortOption>>;
  viewMode: ViewMode;
  setViewMode: React.Dispatch<React.SetStateAction<ViewMode>>;
}) {
  return (
    <Card className="mb-3 bg-gray-800 border-gray-700 w-full">
      <CardContent className="p-2">
        <div className="flex flex-col md:flex-row gap-2 md:gap-3 items-stretch md:items-center">
          <div className="w-full md:flex-1">
            <Input
              placeholder="Search ratings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 w-full"
            />
          </div>

          <div className="flex items-center gap-2 justify-between md:justify-start">
            <span className="text-sm font-medium text-gray-300 shrink-0">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="flex-1 md:flex-none px-2 md:px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white text-sm min-w-0"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Name A-Z</option>
              <option value="name-desc">Name Z-A</option>
              <option value="rating">Highest Rating</option>
              <option value="rating-low">Lowest Rating</option>
              <option value="release-newest">Release Date (Newest)</option>
              <option value="release-oldest">Release Date (Oldest)</option>
              <option value="completion-newest">Completion Date (Newest)</option>
              <option value="completion-oldest">Completion Date (Oldest)</option>
            </select>

            <div className="flex items-center gap-1 bg-gray-700 rounded-md p-1 shrink-0">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded ${viewMode === "grid" ? "bg-indigo-600 text-white" : "text-gray-300 hover:bg-gray-600"}`}
                aria-label="Grid view"
                title="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded ${viewMode === "list" ? "bg-indigo-600 text-white" : "text-gray-300 hover:bg-gray-600"}`}
                aria-label="List view"
                title="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}