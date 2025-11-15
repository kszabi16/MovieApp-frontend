export interface Movie {
  id: number; 
  title: string;
  description: string;
  releaseYear: number;
  posterUrl: string; 
  averageRating: number; 

  director: string; 

  genres: string[]; 
}