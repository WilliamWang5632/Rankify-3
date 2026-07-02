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
          <CardContent className="p-2 flex items-center gap-3">
            <img
              src={item.picture}
              alt={item.name}
              className="w-14 h-14 object-cover rounded-md shrink-0 aspect-square"
              onError={(e) => {
                e.currentTarget.src = `https://images.unsplash.com/photo-1489599953329-c414b2b12d83?w=400&h=300&fit=crop&t=${item.id}`;
              }}
            />

            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-white truncate">{item.name}</h3>
              <p className="text-xs text-gray-400 line-clamp-1">{item.review}</p>
            </div>

            {/* <div className="hidden sm:flex flex-col text-[11px] text-gray-400 w-32 shrink-0">
              {item.releaseDate && <span>Released: {item.releaseDate}</span>}
              {item.completionDate && <span>Completed: {item.completionDate}</span>}
            </div> */}

            <div className="w-32 shrink-0">
              <RatingProgressBar rating={item.rating} />
            </div>

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