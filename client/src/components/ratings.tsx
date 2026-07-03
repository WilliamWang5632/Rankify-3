import { Card, CardContent } from "./ui/card";
import type { Rating } from "../interfaces/rating";
import RatingProgressBar from "./progress-bar";

export default function Ratings({
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
    <div className="grid gap-3 min-w-full grid-cols-2 xs:grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10">
      {filteredAndSortedItems.map((item: Rating) => (
        <Card
          key={item.id}
          onClick={() => !loading && openEditModal(item)}
          className="group relative hover:bg-gray-750 transition-colors duration-200 bg-gray-800 border-gray-700 cursor-pointer"
        >
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

          <CardContent className="p-0 flex flex-col h-full">
            <div className="relative overflow-hidden rounded-t-lg aspect-square">
              <img
                src={item.picture}
                alt={item.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = `https://images.unsplash.com/photo-1489599953329-c414b2b12d83?w=400&h=300&fit=crop&t=${item.id}`;
                }}
              />
            </div>

            <div className="p-2 flex flex-col flex-1">
              <h3 className="text-xs font-bold mb-2 text-white line-clamp-2 h-8">
                {item.name}
              </h3>

              <div className="mb-1">
                <RatingProgressBar rating={item.rating} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}