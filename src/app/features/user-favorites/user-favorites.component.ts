import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { catchError, forkJoin, of } from 'rxjs';
import { Movie } from '../../core/models/movie.models';
import { MovieService } from '../../core/services/movie.service';
import { FavoriteService } from '../../core/services/favorite.service';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-favorites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-favorites.component.html',
  styleUrls: ['./user-favorites.component.css']
})
export class UserFavoritesComponent implements OnInit {

  movies: Movie[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(
    private movieService: MovieService,
    private favoriteService: FavoriteService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.error = null;

    forkJoin({
      movies: this.movieService.getMovies(),
      favorites: this.favoriteService.getMyFavorites()
    })
    .pipe(
      catchError(err => {
        console.error('Hiba a kedvencek betöltésekor:', err);
        if (err.status === 401 || err.status === 403) {
          this.error = 'Nincs jogosultságod az adatok megtekintéséhez.';
        } else {
          this.error = 'Ismeretlen hiba történt a kedvencek betöltése közben.';
        }
        return of(null);
      })
    )
    .subscribe(data => {
      if (!data) {
        this.isLoading = false;
        return;
      }

      const favIds = new Set<number>(data.favorites.map(f => f.movieId));
      this.movies = data.movies.filter(m => favIds.has(m.id));
      this.isLoading = false;
    });
  }

  removeFromFavorites(movieId: number): void {
    const oldMovies = [...this.movies];
    this.movies = this.movies.filter(m => m.id !== movieId);

    this.favoriteService.unfavoriteMovie(movieId).subscribe({
      next: () => {
      },
      error: (err) => {
        console.error('Hiba a kedvenc törlésekor, UI visszaállítva:', err);
        this.movies = oldMovies;
      }
    });
  }
}
