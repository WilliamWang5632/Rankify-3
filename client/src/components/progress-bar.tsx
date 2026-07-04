export const getRatingColor = (rating: number): string => {
  const validRating = Math.max(0, Math.min(10, rating));

  switch (true) {
    case validRating >= 9.5:
      return '#009e84';
    case validRating >= 9:
      return '#0dc25d';
    case validRating >= 8.5:
      return '#1ae635';
    case validRating >= 8:
      return '#75e61a';
    case validRating >= 7.5:
      return '#a1e61a';
    case validRating >= 7:
      return '#cee61a';
    case validRating >= 6.5:
      return '#e6d11a';
    case validRating >= 6:
      return '#e6a51a';
    case validRating >= 5.5:
      return '#e6791a';
    case validRating >= 5:
      return '#e64d1a';
    case validRating >= 4.5:
      return '#e6471a';
    case validRating >= 4:
      return '#e6421a';
    case validRating >= 3.5:
      return '#e63d1a';
    case validRating >= 3:
      return '#e6381a';
    case validRating >= 2.5:
      return '#e6331a';
    case validRating >= 2:
      return '#e62e1a';
    case validRating >= 1.5:
      return '#e6291a';
    case validRating >= 1:
      return '#e6241a';
    case validRating >= 0.5:
      return '#e61f1a';
    default:
      return '#e61a1a';
  }
};

export default function RatingProgressBar({ rating }: { rating: number }) {
  const validRating = Math.max(0, Math.min(10, rating));
  const percentage = (validRating / 10) * 100;
  const color = getRatingColor(rating);

  return (
    <div className="space-y-1">
      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
        <div
          className="h-full transition-all duration-300 rounded-full"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-foreground">{percentage.toFixed(0)}%</span>
      </div>
    </div>
  );
}