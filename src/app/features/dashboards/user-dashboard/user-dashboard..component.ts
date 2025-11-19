import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { catchError, forkJoin, of, tap } from 'rxjs';
import { Movie } from '../../../core/models/movie.models';
import { MovieService } from '../../../core/services/movie.service';
import { RatingService, UserRating, CreateRatingDto } from '../../../core/services/rating.service';
import { FavoriteService, UserFavorite } from '../../../core/services/favorite.service';
import { ViewHistoryService, UserViewHistory } from '../../../core/services/view-history.service';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  movies: Movie[] = [];
  
  myRatings = new Map<number, number>(); 
  myFavorites = new Set<number>();      
  mySeen = new Set<number>();           

  isLoading = true;
  error: string | null = null;

  constructor(
    private movieService: MovieService,
    private ratingService: RatingService,
    private favoriteService: FavoriteService,
    private viewHistoryService: ViewHistoryService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.error = null;

    forkJoin({
      movies: this.movieService.getMovies(),
      ratings: this.ratingService.getMyRatings(),
      favorites: this.favoriteService.getMyFavorites(),
      seenHistory: this.viewHistoryService.getMyViewHistory()
    }).pipe(
      catchError(err => {
        console.error('Hiba a dashboard adatok betöltésekor:', err);
        if (err.status === 401 || err.status === 403) {
          this.error = "Nincs jogosultságod az adatok megtekintéséhez.";
        } else {
          this.error = "Ismeretlen hiba történt az adatok betöltése közben. (Valószínűleg API útvonal hiba)";
        }
        return of(null); 
      })
    ).subscribe(data => {
      if (!data) {
        this.isLoading = false;
        return;
      }
      
      this.movies = data.movies;

      data.ratings.forEach(r => this.myRatings.set(r.movieId, r.score));
      data.favorites.forEach(f => this.myFavorites.add(f.movieId));
      data.seenHistory.forEach(s => this.mySeen.add(s.movieId));
      
      this.isLoading = false;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  goToMovies(): void {
    this.router.navigate(['/user-dashboard']);
  }

  goToFavorites(): void {
    this.router.navigate(['/favorites']);
  }

  isFavorite(movieId: number): boolean {
    return this.myFavorites.has(movieId);
  }

  isSeen(movieId: number): boolean {
    return this.mySeen.has(movieId);
  }

  getRating(movieId: number): number {
    const score = this.myRatings.get(movieId) || 0;
    return score / 2; 
  }

  onRate(movieId: number, rating: number): void {
    const score = rating * 2; 
    const oldScore = this.myRatings.get(movieId) || 0;

    this.myRatings.set(movieId, score); 
    this.myRatings = new Map(this.myRatings);

    this.ratingService.rateMovie({ movieId, score }).subscribe({
      next: () => {
      },
      error: (err) => {
        console.error('Hiba az értékelés mentésekor, UI visszaállítva:', err);
        this.myRatings.set(movieId, oldScore);
        this.myRatings = new Map(this.myRatings);
      }
    });
  }

  onToggleFavorite(movieId: number): void {
    const wasFavorite = this.isFavorite(movieId);

    if (wasFavorite) {
      this.myFavorites.delete(movieId);
    } else {
      this.myFavorites.add(movieId);
    }
    this.myFavorites = new Set(this.myFavorites);

    const request$ = wasFavorite 
      ? this.favoriteService.unfavoriteMovie(movieId)
      : this.favoriteService.favoriteMovie({ movieId });

    request$.subscribe({
      next: () => {
      },
      error: (err) => {
        console.error('Hiba a kedvenc mentésekor, UI visszaállítva:', err);
        if (wasFavorite) {
          this.myFavorites.add(movieId);
        } else {
          this.myFavorites.delete(movieId);
        }
        this.myFavorites = new Set(this.myFavorites);
      }
    });
  }

  onToggleSeen(movieId: number): void {
    const wasSeen = this.isSeen(movieId);

    if (wasSeen) {
      this.mySeen.delete(movieId);
    } else {
      this.mySeen.add(movieId);
    }
    this.mySeen = new Set(this.mySeen);

    const request$ = wasSeen
      ? this.viewHistoryService.removeFromSeen(movieId)
      : this.viewHistoryService.markAsSeen(movieId);

    request$.subscribe({
      next: () => {
      },
      error: (err) => {
        console.error('Hiba a "Láttam" mentésekor, UI visszaállítva:', err);
        if (wasSeen) {
          this.mySeen.add(movieId);
        } else {
          this.mySeen.delete(movieId);
        }
        this.mySeen = new Set(this.mySeen);
      }
    });
  }
}