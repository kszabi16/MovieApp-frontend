import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environments';
import { AuthService } from './auth.service'; 

export interface CreateRatingDto {
  movieId: number; 
  score: number; 
}

export interface UserRating {
  movieId: number;
  score: number; 
}

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private ratingUrl = `${environment.apiUrl}/Rating`;

  private authService = inject(AuthService);

  constructor(private http: HttpClient) { }

  getMyRatings(): Observable<UserRating[]> {
    const userId = this.authService.user?.id; 
    
    if (!userId) {
      console.warn('RatingService: Nincs userId, értékelések lekérése sikertelen.');
      return of([]); 
    }

    return this.http.get<UserRating[]>(`${this.ratingUrl}/user/${userId}`);
  }

  rateMovie(dto: CreateRatingDto): Observable<any> {
    const userId = this.authService.user?.id;
    
    if (!userId) {
      return throwError(() => new Error('A felhasználó nincs bejelentkezve.'));
    }

    return this.http.post(`${this.ratingUrl}/${userId}`, dto).pipe(
      tap(() => console.log(`Film értékelve: ${dto.movieId}, Értékelés: ${dto.score}`))
    );
  }
}