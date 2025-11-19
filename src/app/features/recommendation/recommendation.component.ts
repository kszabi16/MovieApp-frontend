import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { catchError, forkJoin, of } from 'rxjs';
import { Movie } from '../../core/models/movie.models';
import { RecommendationService } from '../../core/services/recommendation.service';
import { RatingService } from '../../core/services/rating.service';
import { FavoriteService } from '../../core/services/favorite.service';
import { ViewHistoryService } from '../../core/services/view-history.service';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recommendations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationsComponent implements OnInit {

  movies: Movie[] = [];

  myRatings = new Map<number, number>();
  myFavorites = new Set<number>();
  mySeen = new Set<number>();

  isLoading = true;
  error: string | null = null;

  constructor(
    private recommendationService: RecommendationService,
    private ratingService: RatingService,
    private favoriteService: FavoriteService,
    private viewHistoryService: ViewHistoryService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.user;

    if (!currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    const userId = currentUser.id;

    this.isLoading = true;
    this.error = null;

    forkJoin({
      recommendations: this.recommendationService.getRecommendations(userId, 10),
      ratings: this.ratingService.getMyRatings(),
      favorites: this.favoriteService.getMyFavorites(),
      seenHistory: this.viewHistoryService.getMyViewHistory()
    })
      .pipe(
        catchError(err => {
          console.error('Hiba az ajánlások betöltésekor:', err);
          if (err.status === 404) {
            this.error = 'Jelenleg nincs elég adat ajánlásokhoz. Értékelj és nézz meg néhány filmet!';
          } else if (err.status === 401 || err.status === 403) {
            this.error = 'Nincs jogosultságod az ajánlott filmek megtekintéséhez.';
          } else {
            this.error = 'Ismeretlen hiba történt az ajánlások betöltése közben.';
          }
          return of(null);
        })
      )
      .subscribe(data => {
        if (!data) {
          this.isLoading = false;
          return;
        }

        this.movies = data.recommendations;

        data.ratings.forEach((r: any) => this.myRatings.set(r.movieId, r.score));
        data.favorites.forEach((f: any) => this.myFavorites.add(f.movieId));
        data.seenHistory.forEach((s: any) => this.mySeen.add(s.movieId));

        this.isLoading = false;
      });
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
      next: () => {},
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
      next: () => {},
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
      next: () => {},
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
