export interface UserStatistics {
  userId: number;
  username: string;
  totalViews: number;
  totalRatings: number;
  totalFavorites: number;
}
export interface TopRatedMovie {
  id: number;
  title: string;
  averageRating: number;
  posterUrl: string;
  genres: string[];
}
