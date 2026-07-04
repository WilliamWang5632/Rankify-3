import type { Rating } from "../interfaces/rating";
import { getRatingColor } from "./progress-bar";

interface TierGroup {
  label: string;
  min: number;
  max: number;
  items: Rating[];
}

function buildTiers(items: Rating[]): TierGroup[] {
  const buckets: TierGroup[] = [];

  // Top bucket is 95-100, then 5-point buckets down to 0-4
  const boundaries: [number, number][] = [[95, 100]];
  for (let start = 90; start >= 0; start -= 5) {
    boundaries.push([start, start + 4]);
  }

  for (const [min, max] of boundaries) {
    buckets.push({ label: `${min}-${max}`, min, max, items: [] });
  }

  for (const item of items) {
    const percentage = Math.max(0, Math.min(100, (item.rating / 10) * 100));
    const bucket = buckets.find((b) => percentage >= b.min && percentage <= b.max);
    if (bucket) bucket.items.push(item);
  }

  return buckets.filter((b) => b.items.length > 0);
}

export default function TierList({
  filteredAndSortedItems,
  openEditModal,
}: {
  filteredAndSortedItems: Rating[];
  openEditModal: (item: Rating) => void;
}) {
  const tiers = buildTiers(filteredAndSortedItems);

  if (tiers.length === 0) return null;

  return (
    <div className="flex flex-col gap-2 w-full">
      {tiers.map((tier) => (
        <div
          key={tier.label}
          className="flex border border-border rounded-lg overflow-hidden bg-card"
        >
        <div
            className="w-16 sm:w-20 shrink-0 flex items-center justify-center text-center font-bold text-white text-xs sm:text-sm p-2"
            style={{ backgroundColor: getRatingColor(tier.min / 10) }}
        >
            {tier.label}
        </div>
          <div className="flex-1 flex flex-wrap gap-2 p-2">
            {tier.items.map((item) => (
              <div
                key={item.id}
                onClick={() => openEditModal(item)}
                className="w-14 h-14 sm:w-20 sm:h-20 rounded-md overflow-hidden cursor-pointer aspect-square shrink-0 hover:opacity-80 transition-opacity"
                title={item.name}
              >
                <img
                  src={item.picture}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = `https://images.unsplash.com/photo-1489599953329-c414b2b12d83?w=400&h=300&fit=crop&t=${item.id}`;
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}