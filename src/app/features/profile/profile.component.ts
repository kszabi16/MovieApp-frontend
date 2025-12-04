import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { UserService, UserProfile } from '../../core/services/user-profile.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: UserProfile | null = null;
  isLoading = true;
  error: string | null = null;
  success: string | null = null;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.user;

    if (!currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    const id = Number(currentUser.id);

    if (isNaN(id)) {
        this.error = "Érvénytelen felhasználói azonosító.";
        this.isLoading = false;
        return;
    }

    this.userService.getUserById(id).subscribe({
      next: (user) => {
        this.profile = user;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Profil betöltési hiba:', err);
        this.error = (err.status === 401 || err.status === 403)
          ? 'Nincs jogosultságod a profil megtekintéséhez.'
          : 'Nem sikerült betölteni a profilt.';
        this.isLoading = false;
      }
    });
  }

  onSave(): void {
    if (!this.profile) {
      return;
    }

    this.error = null;
    this.success = null;

    this.userService.updateUser(this.profile).subscribe({
      next: (updated) => {
        this.profile = updated;

        this.success = 'Profil sikeresen frissítve.';

        setTimeout(() => {
            this.success = null;
        }, 3000);
      },
      error: (err) => {
        console.error('Profil mentési hiba:', err);
        this.error = err.error?.message ?? 'Nem sikerült frissíteni a profilt.';
      }
    });
  }
}