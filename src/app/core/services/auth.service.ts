import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environments';
import { AuthResponseDto, LoginDto, RegisterDto } from '../models/auth.models';
import { getRoleFromToken } from '../utils/jwt.util';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  register(dto: RegisterDto): Observable<AuthResponseDto> {
    return this.http.post<AuthResponseDto>(`${this.baseUrl}/register`, dto).pipe(
      tap(res => this.saveAuth(res))
    );
  }

  login(dto: LoginDto): Observable<AuthResponseDto> {
    return this.http.post<AuthResponseDto>(`${this.baseUrl}/login`, dto).pipe(
      tap(res => this.saveAuth(res))
    );
  }

  saveAuth(res: AuthResponseDto) {
    localStorage.setItem('token', res.token);
    localStorage.setItem('user', JSON.stringify(res.user));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  get token(): string | null {
    return localStorage.getItem('token');
  }

  get user(): any | null {
    const data = localStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  }

  get isLoggedIn(): boolean {
    return !!this.token;
  }

  get role(): string | null {
  return getRoleFromToken(this.token);
}
}
