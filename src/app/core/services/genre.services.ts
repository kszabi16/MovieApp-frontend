import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Genre } from '../../core/models/genre.models';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class GenreService {
  private genreUrl = `${environment.apiUrl}/Genre`;

  constructor(private http: HttpClient) {}

  getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(this.genreUrl);
  }
}
