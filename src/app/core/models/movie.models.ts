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
  genreIds: number[];
}

export interface UpdateMovieDto {
  id: number;
  title: string;
  description: string;
  releaseYear: number;
  posterUrl?: string;
  genreIds: number[];
}

export interface GenreDto {
  id: number;
  name: string;
}