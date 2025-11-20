import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsService } from '../../core/services/statistics.service';
import { UserStatistics } from '../../core/models/statistics.models';
import { AuthService } from '../../core/services/auth.service';

interface LeaderboardItem extends UserStatistics {
  points: number;
}

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  items: LeaderboardItem[] = [];
  isLoading = true;
  error: string | null = null;

  currentUserId: number | null = null;

  constructor(
    private statisticsService: StatisticsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.user;
    this.currentUserId = user ? user.id : null;

    this.isLoading = true;
    this.error = null;

    this.statisticsService.getMostActiveUsers(50).subscribe({
      next: (data) => {
        this.items = data
          .map(u => ({
            ...u,
            points: u.totalRatings * 3 + u.totalFavorites * 2 + u.totalViews * 1
          }))
          .sort((a, b) => b.points - a.points || a.username.localeCompare(b.username));

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Hiba a ranglista betöltésekor:', err);
        this.error = 'Nem sikerült betölteni a ranglistát.';
        this.isLoading = false;
      }
    });
  }

  isCurrentUser(item: LeaderboardItem): boolean {
    return this.currentUserId !== null && item.userId === this.currentUserId;
  }
}
