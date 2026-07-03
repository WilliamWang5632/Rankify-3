export default function RatingProgressBar({ rating }: { rating: number }) {
  const validRating = Math.max(0, Math.min(10, rating));
  const percentage = (validRating / 10) * 100;
  
  const getColor = () => {
    if (validRating >= 9.5) return 'bg-emerald-500';
    if (validRating >= 9) return 'bg-green-500';
    if (validRating >= 8.5) return 'bg-green-400';
    if (validRating >= 8) return 'bg-lime-500';
    if (validRating >= 7.5) return 'bg-lime-300'; 
    if (validRating >= 7) return 'bg-yellow-300';
    if (validRating >= 6.5) return 'bg-amber-400';
    if (validRating >= 6) return 'bg-amber-500';
    if (validRating >= 5.5) return 'bg-orange-400';
    if (validRating >= 5) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-1">
      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
        <div
          className={`h-full ${getColor()} transition-all duration-300 rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-foreground">{percentage.toFixed(0)}%</span>
      </div>
    </div>
  );
}