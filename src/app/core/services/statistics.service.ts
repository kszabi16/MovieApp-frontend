import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { UserStatistics } from '../models/statistics.models';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private baseUrl = `${environment.apiUrl}/statistics`;

  constructor(private http: HttpClient) {}

  getMostActiveUsers(count: number = 20): Observable<UserStatistics[]> {
    return this.http.get<UserStatistics[]>(`${this.baseUrl}/active-users?count=${count}`);
  }
}
