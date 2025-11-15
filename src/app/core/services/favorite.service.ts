import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environments';
import { AuthService } from './auth.service';

export interface FavoriteMovieDto {
  movieId: number;
}

export interface UserFavorite {
  id: number; 
  movieId: number;
}

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private favoriteUrl = `${environment.apiUrl}/Favorite`;
  private authService = inject(AuthService); 

  constructor(private http: HttpClient) { }

  getMyFavorites(): Observable<UserFavorite[]> {
    const userId = this.authService.user?.id;
    if (!userId) {
      return of([]); 
    }
    return this.http.get<UserFavorite[]>(`${this.favoriteUrl}/user/${userId}`);
  }

  favoriteMovie(dto: FavoriteMovieDto): Observable<any> {
    const userId = this.authService.user?.id;
    if (!userId) {
      return throwError(() => new Error('Nincs user ID a kedvenc hozzáadásához.'));
    }
    return this.http.post(`${this.favoriteUrl}/${userId}`, dto).pipe(
      tap(() => console.log(`Film kedvencekhez adva: ${dto.movieId}`))
    );
  }

  unfavoriteMovie(movieId: number): Observable<any> {
    const userId = this.authService.user?.id;
    if (!userId) {
      return throwError(() => new Error('Nincs user ID a kedvenc törléséhez.'));
    }
    return this.http.delete(`${this.favoriteUrl}/${userId}/${movieId}`).pipe(
      tap(() => console.log(`Film kedvencekből törölve: ${movieId}`))
    );
  }
}