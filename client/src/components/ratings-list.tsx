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
          className="group relative hover:bg-card-hover transition-colors duration-200 bg-card border-border cursor-pointer"
        >
          <CardContent className="p-2 sm:pr-10 flex flex-wrap sm:flex-nowrap items-center gap-2">
            <img
              src={item.picture}
              alt={item.name}
              className="w-14 h-14 sm:w-20 sm:h-20 sm:ml-60 sm:mr-10 object-cover rounded-md shrink-0 aspect-square"
              onError={(e) => {
                e.currentTarget.src = `https://images.unsplash.com/photo-1489599953329-c414b2b12d83?w=400&h=300&fit=crop&t=${item.id}`;
              }}
            />

            <div className="flex-1 min-w-0 sm:flex-none sm:w-80">
              <h3 className="text-sm font-bold text-foreground truncate">
                {item.name}
              </h3>
              {item.releaseDate && (
                <span className="text-xs text-muted-foreground sm:hidden">
                  {item.releaseDate.slice(0, 4)}
                </span>
              )}
            </div>

            <span className="hidden sm:inline text-base text-muted-foreground mr-20 font-semibold shrink-0 w-12">
              {item.releaseDate ? `(${item.releaseDate.slice(0, 4)})` : ""}
            </span>

            <div className="w-24 sm:w-64 sm:mr-10 sm:mt-6 shrink-0 self-center">
              <RatingProgressBar rating={item.rating} />
            </div>

            {item.completionDate && (
              <span className="w-full sm:w-56 shrink-0 text-xs sm:text-base text-muted-foreground pl-16 sm:pl-0">
                Completed: {item.completionDate.slice(0, 10)}
              </span>
            )}

            <button
                onClick={(e) => {
                e.stopPropagation();
                handleDelete(item.id);
                }}
                disabled={loading}
                className="absolute top-1 right-1 z-10 bg-secondary hover:bg-destructive text-foreground hover:text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold leading-none transition-colors"
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