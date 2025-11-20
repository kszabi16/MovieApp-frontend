import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { catchError, forkJoin, of } from 'rxjs';
import { Movie } from '../../../core/models/movie.models';
import { MovieService } from '../../../core/services/movie.service';

import { RatingService } from '../../../core/services/rating.service';
import { FavoriteService } from '../../../core/services/favorite.service';
import { ViewHistoryService } from '../../../core/services/view-history.service';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

  searchTerm: string = '';
  searchField: 'all' | 'title' | 'director' | 'genre' = 'all';
  isSearchDropdownOpen = false;

  allGenres: string[] = [];
  genreSuggestions: string[] = [];
  selectedGenre: string | null = null;

  constructor(
    private movieService: MovieService,
    private ratingService: RatingService,
    private favoriteService: FavoriteService,
    private viewHistoryService: ViewHistoryService
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

      data.ratings.forEach((r: any) => this.myRatings.set(r.movieId, r.score));
      data.favorites.forEach((f: any) => this.myFavorites.add(f.movieId));
      data.seenHistory.forEach((s: any) => this.mySeen.add(s.movieId));

      const genreSet = new Set<string>();
      this.movies.forEach(m => {
        if (m.genres && Array.isArray(m.genres)) {
          m.genres.forEach(g => genreSet.add(g));
        }
      });
      this.allGenres = Array.from(genreSet).sort();

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
        console.error('Hiba a \"Láttam\" mentésekor, UI visszaállítva:', err);
        if (wasSeen) {
          this.mySeen.add(movieId);
        } else {
          this.mySeen.delete(movieId);
        }
        this.mySeen = new Set(this.mySeen);
      }
    });
  }

  toggleSearchDropdown(): void {
    this.isSearchDropdownOpen = !this.isSearchDropdownOpen;
  }

  setSearchField(field: 'all' | 'title' | 'director' | 'genre'): void {
    this.searchField = field;
    this.isSearchDropdownOpen = false;

    if (field !== 'genre') {
      this.selectedGenre = null;
      this.genreSuggestions = [];
    }
  }

  getSearchFieldLabel(): string {
    switch (this.searchField) {
      case 'title': return 'Cím';
      case 'director': return 'Rendező';
      case 'genre': return 'Műfaj';
      default: return 'Minden';
    }
  }

  onSearchTermChange(term: string): void {
    this.searchTerm = term;

    if (this.searchField === 'genre') {
      const t = term.trim().toLowerCase();

      if (!t) {
        this.genreSuggestions = [];
        this.selectedGenre = null;
        return;
      }

      this.genreSuggestions = this.allGenres
        .filter(g => g.toLowerCase().includes(t));

      this.selectedGenre = null;
    } else {
      this.genreSuggestions = [];
      this.selectedGenre = null;
    }
  }

  selectGenre(genre: string): void {
    this.selectedGenre = genre;
    this.searchTerm = genre;
    this.genreSuggestions = [];
  }

  get filteredMovies(): Movie[] {
    const term = this.searchTerm.trim().toLowerCase();

    if (this.searchField === 'genre') {
      if (!this.selectedGenre) {
        return this.movies;
      }

      return this.movies.filter(m =>
        (m.genres || []).includes(this.selectedGenre as string)
      );
    }

    if (!term) {
      return this.movies;
    }

    return this.movies.filter(movie => {
      const title = movie.title?.toLowerCase() ?? '';
      const description = movie.description?.toLowerCase() ?? '';
      const director = (movie as any).director?.toLowerCase() ?? '';
      const genres = (movie.genres ?? []).map(g => g.toLowerCase());

      switch (this.searchField) {
        case 'title':
          return title.includes(term);

        case 'director':
          return director.includes(term);

        case 'all':
        default:
          return (
            title.includes(term) ||
            description.includes(term) ||
            director.includes(term) ||
            genres.some(g => g.includes(term))
          );
      }
    });
  }
}
