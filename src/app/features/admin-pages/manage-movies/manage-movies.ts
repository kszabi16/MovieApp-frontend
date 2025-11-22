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
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './manage-movies.html',
  styleUrls: ['./manage-movies.css']
})
export class ManageMoviesComponent implements OnInit {

  movies: Movie[] = [];
  genres: Genre[] = [];  
  selectedGenres: string[] = [];
  isFormOpen = false;
  editingMovie: Movie | null = null;
  formModel: CreateMovieDto | UpdateMovieDto = {
    title: '',
    description: '',
    releaseYear: 2000,
    posterUrl: '',
    director: '',
    genres: []
  };
  

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
      console.log('Filmek betöltése sikeres:', res);
      this.movies = res;  // Ellenőrizd, hogy valóban itt kapod meg az adatokat
      this.isLoading = false;
    },
    error: (err) => {
      console.error('Hiba a filmek betöltésekor:', err);
      this.error = 'Nem sikerült betölteni a filmeket.';
      this.isLoading = false;
    }
  });
}

  loadGenres() {
    this.genreService.getGenres().subscribe({
      next: (res) => {
        this.genres = res;
      },
      error: (err) => {
        console.error('Műfajok betöltése sikertelen:', err);
        this.error = 'Nem sikerült betölteni a műfajokat.';
      }
    });
    this.allGenres = this.genres.map(g => g.name).sort();

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
    const director = (movie.director || '').toLowerCase();
    const genres = (movie.genres || []).map(g => g.toLowerCase());

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

 onGenreChange(genreName: string): void {
  const index = this.selectedGenres.indexOf(genreName);
  if (index === -1) {
    this.selectedGenres.push(genreName); // Hozzáadja a kiválasztott műfajt
  } else {
    this.selectedGenres.splice(index, 1); // Eltávolítja a műfajt
  }
  this.formModel.genres = [...this.selectedGenres]; // Frissítjük a formModel.genres-t
}

onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.formModel.posterUrl = e.target.result; // A fájl URL-jét mentjük el
      };
      reader.readAsDataURL(file); // Az adat URL formátumba való konvertálása
    }
  }



  addMovie() {
    this.isFormOpen = true;
    this.editingMovie = null;
    this.formModel = {
      title: '',
      description: '',
      releaseYear: 2000,
      posterUrl: '',
      director: '',
      genres: []
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
      genres: movie.genres || []
    };
  }

  saveMovie() {
  if (!this.editingMovie) {
    // Új film hozzáadása
    const dto: CreateMovieDto = {
      title: this.formModel.title,
      description: this.formModel.description,
      releaseYear: this.formModel.releaseYear,
      posterUrl: this.formModel.posterUrl,
      genres: this.formModel.genres
    };

    this.movieService.create(dto).subscribe({
      next: () => {
        this.isFormOpen = false;
        this.loadMovies(); // Filmek újratöltése
      },
      error: (err) => {
        console.error('Hiba az új film hozzáadásakor:', err);
      }
    });
  } else {
    // Film frissítése
    const dto: UpdateMovieDto = {
      ...this.formModel,
      id: this.editingMovie.id
    };

    this.movieService.update(this.editingMovie.id, dto).subscribe({
      next: () => {
        this.isFormOpen = false;
        this.loadMovies(); // Filmek újratöltése
      },
      error: (err) => {
        console.error('Hiba a film frissítésekor:', err);
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
        next: () => this.loadMovies(),
        error: (err) => {
          console.error('Hiba a film törlésénél:', err);
        }
      });
    }
  }
}
