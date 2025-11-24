import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../../../core/services/statistics.service';
import { TopRatedMovie } from '../../../core/models/statistics.models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-top-rated-movies',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './top-rated-movies.html',
  styleUrls: ['./top-rated-movies.css']
})
export class TopRatedMovies implements OnInit {

  movies: TopRatedMovie[] = [];
  loading = true;
  error = '';

  constructor(private movieService: StatisticsService) {}

  ngOnInit(): void {
    this.movieService.getTopRated(10).subscribe({
      next: (data) => {
        this.movies = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Hoppá, nem sikerült betölteni a toplistát.';
        this.loading = false;
      }
    });
  }
  

}
