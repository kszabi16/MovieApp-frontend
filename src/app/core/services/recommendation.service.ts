import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { Movie } from '../models/movie.models';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {

  private baseUrl = `${environment.apiUrl}/recommendation`;

  constructor(private http: HttpClient) {}

  getRecommendations(userId: number, count: number = 10): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.baseUrl}/${userId}`, {
      params: { count }
    });
  }
}
