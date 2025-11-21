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

export interface CreateMovieDto {
  title: string;
  description: string;
  releaseYear: number;
  posterUrl?: string;
  genres: string[];
}

export interface UpdateMovieDto {
  id: number;
  title: string;
  description: string;
  releaseYear: number;
  posterUrl?: string;
  genres: string[];
}

export interface GenreDto {
  id: number;
  name: string;
}