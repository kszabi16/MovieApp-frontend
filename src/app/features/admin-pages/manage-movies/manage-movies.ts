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
  genres: Genre[] = [];  // A műfajok listája
  selectedGenres: string[] = [];
  isFormOpen = false;
  editingMovie: Movie | null = null;
  formModel: CreateMovieDto | UpdateMovieDto = {
    title: '',
    description: '',
    releaseYear: 2000,
    posterUrl: '',
    genres: []
  };
  

  isLoading = true;
  error: string | null = null;

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
  }
  onGenreChange(genreName: string): void {
  const index = this.formModel.genres.indexOf(genreName);
  if (index === -1) {
    this.formModel.genres.push(genreName); // Hozzáadás, ha nincs benne
  } else {
    this.formModel.genres.splice(index, 1); // Eltávolítás, ha már benne van
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
      genres: movie.genres || []
    };
  }

  saveMovie() {
    if (!this.editingMovie) {
      // Új film hozzáadása
      const dto: CreateMovieDto = { ...this.formModel };
      this.movieService.create(dto).subscribe({
        next: () => {
          this.isFormOpen = false;
          this.loadMovies();
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
          this.loadMovies();
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
