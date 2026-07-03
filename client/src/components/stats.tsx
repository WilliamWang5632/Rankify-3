import { Card } from "./ui/card"
import type { Stats } from "../hooks/useRating"

export default function Stats({stats}: {stats: Stats}){
    return (
            <div className="mb-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 md:gap-3">
              <Card className="text-center p-2 bg-card border-border">
                <div className="text-xl md:text-2xl font-bold text-primary">{stats.totalRatings}</div>
                <div className="text-xs md:text-sm text-muted-foreground">Total Ratings</div>
              </Card>
              <Card className="text-center p-2 bg-card border-border">
                <div className="text-xl md:text-2xl font-bold text-green-500">
                  {stats.meanRating.toFixed(1)}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground">Mean Rating</div>
              </Card>
              <Card className="text-center p-2 bg-card border-border">
                <div className="text-xl md:text-2xl font-bold text-yellow-500">
                  {stats.medianRating.toFixed(1)}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground">Median Rating</div>
              </Card>
              <Card className="text-center p-2 bg-card border-border">
                <div className="text-xl md:text-2xl font-bold text-purple-500">
                  {stats.highestRating.toFixed(1)}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground">Highest Rating</div>
              </Card>
              <Card className="text-center p-2 bg-card border-border">
                <div className="text-xl md:text-2xl font-bold text-orange-500">
                  {stats.lowestRating.toFixed(1)}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground">Lowest Rating</div>
              </Card>
            </div>
    )
}