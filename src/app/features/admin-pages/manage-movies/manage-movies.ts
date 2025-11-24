import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MovieService } from '../../../core/services/movie.service';
import { GenreService } from '../../../core/services/genre.services';
import { Movie, CreateMovieDto, UpdateMovieDto } from '../../../core/models/movie.models';
import { Genre } from '../../../core/models/genre.models';

@Component({
  selector: 'app-manage-movies',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './manage-movies.html',
  styleUrls: ['./manage-movies.css']
})
export class ManageMoviesComponent implements OnInit {

  movies: Movie[] = [];
  genres: Genre[] = [];
  isFormOpen = false;
  editingMovie: Movie | null = null;

  formModel: CreateMovieDto | UpdateMovieDto = {
    title: '',
    description: '',
    releaseYear: 2000,
    posterUrl: '',
    director: '',
    genreIds: []
  };

  isLoading = true;
  error: string | null = null;

  // Keresés
  searchTerm: string = '';
  searchField: 'all' | 'title' | 'director' | 'genre' = 'all';
  isSearchDropdownOpen = false;

  allGenres: string[] = [];
  genreSuggestions: string[] = [];
  selectedGenre: string | null = null;

  constructor(
    private movieService: MovieService,
    private genreService: GenreService
  ) {}

  ngOnInit(): void {
    this.loadMovies();
    this.loadGenres();
  }

  loadMovies() {
    this.isLoading = true;
    this.movieService.getMovies().subscribe({
      next: (res) => {
        this.movies = res;
        this.isLoading = false;
      },
      error: () => {
        this.error = 'Nem sikerült betölteni a filmeket.';
        this.isLoading = false;
      }
    });
  }

  loadGenres() {
    this.genreService.getGenres().subscribe({
      next: (res) => {
        this.genres = res;
        this.allGenres = this.genres.map(g => g.name).sort();
      },
      error: () => {
        this.error = 'Nem sikerült betölteni a műfajokat.';
      }
    });
  }

  // ---------------------
  // KERESÉS
  // ---------------------

  toggleSearchDropdown(): void {
    this.isSearchDropdownOpen = !this.isSearchDropdownOpen;
  }

  setSearchField(field: 'all' | 'title' | 'director' | 'genre'): void {
    this.searchField = field;
    this.isSearchDropdownOpen = false;
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
      if (!t) return;

      this.genreSuggestions = this.allGenres.filter(g =>
        g.toLowerCase().includes(t)
      );
    }
  }

  selectGenre(genreName: string): void {
  const genre = this.genres.find(g => g.name === genreName);
  if (!genre) return;
  this.selectedGenre = genre.id.toString();  
  this.searchTerm = genreName;
  this.genreSuggestions = [];
}
private getGenres(movie: Movie): string[] {
  return movie.genres?.map(g => g.toLowerCase()) ?? [];
}

get filteredMovies(): Movie[] {
  const term = this.searchTerm.trim().toLowerCase();

  // --- GENRE FILTER ---
  if (this.searchField === 'genre') {
    if (!this.selectedGenre) return this.movies;

    const selected = this.selectedGenre.toLowerCase();

    return this.movies.filter(m =>
      this.getGenres(m).some(genreName => genreName.toLowerCase() === selected)
    );
  }

  // --- ÜRES KERESŐ ---
  if (!term) return this.movies;

  // --- ÁLTALÁNOS KERESÉS ---
  return this.movies.filter(movie => {
    const title = movie.title?.toLowerCase() ?? '';
    const description = movie.description?.toLowerCase() ?? '';
    const director = movie.director?.toLowerCase() ?? '';
    const genreNames = this.getGenres(movie).map(g => g.toLowerCase());

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
          genreNames.some(g => g.includes(term))
        );
    }
  });
}

getGenreName(id: number): string {
  return this.genres.find(g => g.id === id)?.name ?? 'Ismeretlen';
}

onGenreCheckboxChanged(event: Event, genreId: number) {
  const checked = (event.target as HTMLInputElement).checked;
  if (checked) {
    if (!this.formModel.genreIds.includes(genreId)) this.formModel.genreIds.push(genreId);
  } else {
    const idx = this.formModel.genreIds.indexOf(genreId);
    if (idx !== -1) this.formModel.genreIds.splice(idx, 1);
  }
}


  // ---------------------
  // MŰFAJ VÁLASZTÁS – ID-ket tárolunk!
  // ---------------------

  onGenreChange(genreId: number): void {
    const index = this.formModel.genreIds.indexOf(genreId);

    if (index === -1) {
      this.formModel.genreIds.push(genreId);
    } else {
      this.formModel.genreIds.splice(index, 1);
    }
  }

  // ---------------------
  // PLAKÁT KEZELÉSE
  // ---------------------

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.formModel.posterUrl = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  // ---------------------
  // FORM NYITÁS
  // ---------------------

  addMovie() {
    this.isFormOpen = true;
    this.editingMovie = null;

    this.formModel = {
      title: '',
      description: '',
      releaseYear: 2000,
      posterUrl: '',
      director: '',
      genreIds: []
    };
  }

  editMovie(movie: Movie) {
    this.isFormOpen = true;
    this.editingMovie = movie;

    this.formModel = {
      id: movie.id,
      title: movie.title,
      description: movie.description,
      releaseYear: movie.releaseYear,
      posterUrl: movie.posterUrl,
      director: movie.director || '',
      genreIds: movie.genreIds || []   // FONTOS!!
    };
  }

  // ---------------------
  // MENTÉS
  // ---------------------

  saveMovie() {
    if (!this.editingMovie) {
      // Új film
      const dto: CreateMovieDto = {
        title: this.formModel.title,
        description: this.formModel.description,
        releaseYear: this.formModel.releaseYear,
        posterUrl: this.formModel.posterUrl,
        director: this.formModel.director,
        genreIds: this.formModel.genreIds
      };

      this.movieService.create(dto).subscribe({
        next: () => {
          this.isFormOpen = false;
          this.loadMovies();
        }
      });
    } else {
      // Szerkesztés
      const dto: UpdateMovieDto = {
        id: this.editingMovie.id,
        title: this.formModel.title,
        description: this.formModel.description,
        releaseYear: this.formModel.releaseYear,
        posterUrl: this.formModel.posterUrl,
        director: this.formModel.director,
        genreIds: this.formModel.genreIds
      };

      this.movieService.update(this.editingMovie.id, dto).subscribe({
        next: () => {
          this.isFormOpen = false;
          this.loadMovies();
        }
      });
    }
  }

  closeForm() {
    this.isFormOpen = false;
    this.editingMovie = null;
  }

  deleteMovie(id: number) {
    if (confirm('Biztosan törölni szeretnéd?')) {
      this.movieService.delete(id).subscribe({
        next: () => this.loadMovies()
      });
    }
  }
}
