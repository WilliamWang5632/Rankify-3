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
    <div className="flex flex-col gap-2 w-full max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto">
      {filteredAndSortedItems.map((item: Rating, index: number) => (
        <Card
          key={item.id}
          onClick={() => !loading && openEditModal(item)}
          className="group relative hover:bg-card-hover transition-colors duration-200 bg-card border-border cursor-pointer"
        >
          <CardContent className="p-2 sm:pr-10">
            {/* Mobile layout */}
            <div className="flex sm:hidden items-center gap-3">
              <img
                src={item.picture}
                alt={item.name}
                className="w-14 h-14 object-cover rounded-md shrink-0 aspect-square"
                onError={(e) => {
                  e.currentTarget.src = `https://images.unsplash.com/photo-1489599953329-c414b2b12d83?w=400&h=300&fit=crop&t=${item.id}`;
                }}
              />

              <div className="flex-1 min-w-0 max-w-[50%] space-y-0.5">
                <h3 className="text-sm font-bold text-foreground truncate">
                  <span className="text-muted-foreground font-semibold">
                    {index + 1}.{" "}
                  </span>
                  {item.name}
                </h3>
                {item.releaseDate && (
                  <div className="text-xs text-muted-foreground">
                    {item.releaseDate.slice(0, 4)}
                  </div>
                )}
                {item.completionDate && (
                  <div className="text-xs text-muted-foreground truncate">
                    Completed: {item.completionDate.slice(0, 10)}
                  </div>
                )}
              </div>

                <div className="w-16 shrink-0 self-center mt-5">
                    <RatingProgressBar rating={item.rating} />
                </div>
            </div>

            {/* Desktop/tablet layout */}
            <div
              className="
                hidden
                sm:grid sm:grid-cols-[1.5rem_auto_minmax(0,1fr)_minmax(3rem,auto)_minmax(10rem,1fr)_minmax(9rem,auto)]
                sm:items-center sm:gap-x-10
              "
            >
              <span className="text-lg ml-5 font-semibold text-muted-foreground text-right">
                {index + 1}
              </span>

              <img
                src={item.picture}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-md shrink-0 aspect-square"
                onError={(e) => {
                  e.currentTarget.src = `https://images.unsplash.com/photo-1489599953329-c414b2b12d83?w=400&h=300&fit=crop&t=${item.id}`;
                }}
              />

              <div className="min-w-0">
                <h3 className="text-sm font-bold text-foreground truncate">
                  {item.name}
                </h3>
              </div>

              <span className="text-base text-muted-foreground font-semibold text-right pr-10">
                {item.releaseDate ? `(${item.releaseDate.slice(0, 4)})` : ""}
              </span>

              <div className="w-full shrink-0 self-center mt-6">
                <RatingProgressBar rating={item.rating} />
              </div>

              <span className="text-base text-muted-foreground">
                {item.completionDate
                  ? `Completed: ${item.completionDate.slice(0, 10)}`
                  : ""}
              </span>
            </div>

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