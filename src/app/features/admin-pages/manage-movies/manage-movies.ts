import { Component, OnInit } from '@angular/core';
import {
  Movie,
  CreateMovieDto,
  UpdateMovieDto,
  GenreDto
} from '../../../core/models/movie.models';
import { MovieService } from '../../../core/services/movie.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-manage-movies',
  standalone: true,
  templateUrl: './manage-movies.html',
  styleUrls: ['./manage-movies.css'],
  imports: [CommonModule, FormsModule]
})
export class ManageMoviesComponent implements OnInit {

  movies: Movie[] = [];
  genres: GenreDto[] = [];

  isFormOpen = false;
  editingMovie: Movie | null = null;

  formModel: CreateMovieDto | UpdateMovieDto = {
    title: '',
    description: '',
    releaseYear: 2000,
    posterUrl: '',
    genreIds: []
  };

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovies();
    this.loadGenres();
  }

  loadMovies() {
    this.movieService.getMovies().subscribe({
      next: res => this.movies = res,
      error: err => console.error('Filmek betöltése sikertelen:', err)
    });
  }

  loadGenres() {
    fetch('https://localhost:7066/api/Genre')      // jelenleg nincs GenreService
      .then(r => r.json())
      .then((res: GenreDto[]) => this.genres = res)
      .catch(err => console.error('Műfajok lekérése sikertelen:', err));
  }

  addMovie() {
    this.isFormOpen = true;
    this.editingMovie = null;

    this.formModel = {
      title: '',
      description: '',
      releaseYear: 2000,
      posterUrl: '',
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
      genreIds: []   
    };
  }

  saveMovie() {
    if (!this.editingMovie) {
      const dto: CreateMovieDto = { ...this.formModel };

      this.movieService.create(dto as any).subscribe({
        next: () => {
          this.isFormOpen = false;
          this.loadMovies();
        },
        error: err => console.error('Felvitel sikertelen:', err)
      });

    } else {
      const dto: UpdateMovieDto = {
        ...(this.formModel as UpdateMovieDto),
        id: this.editingMovie.id
      };

      this.movieService.update(this.editingMovie.id, dto as any).subscribe({
        next: () => {
          this.isFormOpen = false;
          this.loadMovies();
        },
        error: err => console.error('Frissítés sikertelen:', err)
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
        error: err => console.error('Törlés sikertelen:', err)
      });
    }
  }
}
