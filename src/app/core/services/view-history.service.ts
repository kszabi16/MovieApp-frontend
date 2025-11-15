import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environments';
import { AuthService } from './auth.service';

export interface ViewHistoryDto {
  movieId: number;
}

export interface UserViewHistory {
  id: number; 
  movieId: number;
  viewedOn: string; 
}

@Injectable({
  providedIn: 'root'
})
export class ViewHistoryService {
  private viewHistoryUrl = `${environment.apiUrl}/ViewHistory`;
  private authService = inject(AuthService); 

  constructor(private http: HttpClient) { }

  getMyViewHistory(): Observable<UserViewHistory[]> {
    const userId = this.authService.user?.id;
    if (!userId) {
      return of([]); 
    }
    return this.http.get<UserViewHistory[]>(`${this.viewHistoryUrl}/user/${userId}`);
  }

  markAsSeen(movieId: number): Observable<any> {
    const userId = this.authService.user?.id;
    if (!userId) {
      return throwError(() => new Error('Nincs user ID a "láttam" jelöléshez.'));
    }
    return this.http.post(`${this.viewHistoryUrl}/${userId}/${movieId}`, {}).pipe(
      tap(() => console.log(`Film látottnak jelölve: ${movieId}`))
    );
  }

  removeFromSeen(movieId: number): Observable<any> {
    const userId = this.authService.user?.id;
    if (!userId) {
      return throwError(() => new Error('Nincs user ID a "láttam" törléséhez.'));
    }
    return this.http.delete(`${this.viewHistoryUrl}/${userId}/${movieId}`).pipe(
      tap(() => console.log(`Film "láttam" jelölés törölve: ${movieId}`))
    );
  }
}