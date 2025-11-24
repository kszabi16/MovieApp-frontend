import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environments';
import { CreateMovieDto, Movie, UpdateMovieDto } from '../models/movie.models';
import { Genre } from '../models/genre.models';

export interface RateMovieDto {
  movieId: number;
  rating: number; 
}

export interface FavoriteMovieDto {
  movieId: number;
}

export interface ViewHistoryDto {
  movieId: number;
}



@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private movieUrl = `${environment.apiUrl}/Movie`;
  private ratingUrl = `${environment.apiUrl}/Rating`;
  private favoriteUrl = `${environment.apiUrl}/Favorite`;
  private viewHistoryUrl = `${environment.apiUrl}/ViewHistory`;


  constructor(private http: HttpClient) { }

  getMovies(): Observable<Movie[]> {
    console.log('MovieService: Filmek lekérése...');
    return this.http.get<Movie[]>(this.movieUrl).pipe(
        tap(response => {
            console.log('API válasz:', response);
        })
    );
}

  rateMovie(dto: RateMovieDto): Observable<any> {
    return this.http.post(this.ratingUrl, dto).pipe(
      tap(() => console.log(`Film értékelve: ${dto.movieId}, Értékelés: ${dto.rating}`))
    );
  }

  favoriteMovie(dto: FavoriteMovieDto): Observable<any> {
    return this.http.post(this.favoriteUrl, dto).pipe(
      tap(() => console.log(`Film kedvencekhez adva: ${dto.movieId}`))
    );
  }

  markAsSeen(dto: ViewHistoryDto): Observable<any> {
    return this.http.post(this.viewHistoryUrl, dto).pipe(
      tap(() => console.log(`Film látottnak jelölve: ${dto.movieId}`))
    );
  }
  getById(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.movieUrl}/${id}`);
  }

  create(movie: CreateMovieDto): Observable<CreateMovieDto> {
    return this.http.post<CreateMovieDto>(this.movieUrl, movie);
  }

  update(id: number, movie: UpdateMovieDto): Observable<void> {
    return this.http.put<void>(`${this.movieUrl}/${id}`, movie);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.movieUrl}/${id}`).pipe(tap(() => {
      console.log(`Film törölve: ${id}`);
    }));
  }
  
}
