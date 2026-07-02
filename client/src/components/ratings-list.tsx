import { Card, CardContent } from "./ui/card";
import type { Rating } from "../interfaces/rating";
import RatingProgressBar from "./progress-bar";

export default function RatingsList({
  filteredAndSortedItems,
  openEditModal,
  loading,
  handleDelete,
}: {
  filteredAndSortedItems: Rating[];
  openEditModal: (item: Rating) => void;
  loading: boolean;
  handleDelete: (id: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2 min-w-full">
      {filteredAndSortedItems.map((item: Rating) => (
        <Card
          key={item.id}
          onClick={() => !loading && openEditModal(item)}
          className="group relative hover:bg-gray-750 transition-colors duration-200 bg-gray-800 border-gray-700 cursor-pointer"
        >
          <CardContent className="p-2 pr-10 flex items-center gap-2">
            <img
              src={item.picture}
              alt={item.name}
              className="w-20 h-20 ml-60 mr-10 object-cover rounded-md shrink-0 aspect-square"
              onError={(e) => {
                e.currentTarget.src = `https://images.unsplash.com/photo-1489599953329-c414b2b12d83?w=400&h=300&fit=crop&t=${item.id}`;
              }}
            />

            <h3 className="text-sm font-bold text-white truncate w-80 shrink-0">
              {item.name}
            </h3>

            <span className="text-base text-gray-300 mr-20 font-semibold shrink-0 w-12">
              {item.releaseDate ? `(${item.releaseDate.slice(0, 4)})` : ""}
            </span>

            {/* <div className="flex-1" /> */}

            <div className="w-64 mr-10 mt-6 shrink-0 self-center">
              <RatingProgressBar rating={item.rating} />
            </div>

            <span className="text-base text-gray-300 shrink-0 w-56">
              {item.completionDate ? `Completed: ${item.completionDate.slice(0, 10)}` : ""}
            </span>

            <button
                onClick={(e) => {
                e.stopPropagation();
                handleDelete(item.id);
                }}
                disabled={loading}
                className="absolute top-1 right-1 z-10 bg-[#434343] hover:bg-[#c52b2b] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold leading-none transition-colors"
                aria-label="Delete rating"
            >
                ×
            </button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}