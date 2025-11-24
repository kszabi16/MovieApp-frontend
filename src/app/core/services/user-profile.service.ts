import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  role: string;
  password?: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  private baseUrl = `${environment.apiUrl}/user`;

  constructor(private http: HttpClient) {}

  getUserById(id: number): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.baseUrl}/${id}`);
  }

  updateUser(user: UserProfile): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${this.baseUrl}/${user.id}`, user);
  }
  createUser(user: UserProfile): Observable<UserProfile> {
  return this.http.post<UserProfile>(`${this.baseUrl}`, user);
}
deleteUser(id: number): Observable<void> {
  return this.http.delete<void>(`${this.baseUrl}/${id}`);
}
getAllUsers(): Observable<UserProfile[]> {
  return this.http.get<UserProfile[]>(`${this.baseUrl}`);
}

}
