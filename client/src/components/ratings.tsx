import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import type { Rating } from "../interfaces/rating";
import RatingProgressBar from "./progress-bar";

export default function Ratings({
  filteredAndSortedItems,
  handleEdit,
  loading,
  handleDelete,
  isFormExpanded,
}: {
  filteredAndSortedItems: Rating[];
  handleEdit: (item: Rating) => void;
  loading: boolean;
  handleDelete: (id: string) => void;
  isFormExpanded: boolean;
}) {
  return (
    <div
      className={`${isFormExpanded ? "lg:grid-cols-7 md:grid-cols-6" : "lg:grid-cols-8 md:grid-cols-7"} grid gap-2`}
    >
      {filteredAndSortedItems.map((item: Rating) => (
        <Card
          key={item.id}
          className="group hover:bg-gray-750 transition-colors duration-200 bg-gray-800 border-gray-700"
        >
          <CardContent className="p-0 flex flex-col h-full">
            <div className="relative overflow-hidden rounded-t-lg">
              <img
                src={item.picture}
                alt={item.name}
                className="w-full h-32 object-cover"
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

              <div className="flex gap-1 mt-auto">
                <Button
                  size="xs"
                  onClick={() => handleEdit(item)}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
                  disabled={loading}
                >
                  Edit
                </Button>
                <Button
                  size="xs"
                  onClick={() => handleDelete(item.id)}
                  className="flex-1 bg-[#d62d2d] hover:bg-[#a61e1e] text-white"
                  disabled={loading}
                >
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
