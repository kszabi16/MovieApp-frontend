import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get role(): string | null {
    return this.authService.role;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  goToMovies(): void {
    if (this.role === 'Admin') {
      this.router.navigate(['/user-dashboard']);
    } else {
      this.router.navigate(['/user-dashboard']);
    }
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }

  goToFavorites(): void {
    this.router.navigate(['/favorites']);
  }

  goToRecommendations(): void {
    this.router.navigate(['/recommendations']);
    }
  
  goToLeaderboard(): void {
    this.router.navigate(['/leaderboard']);
  }
}