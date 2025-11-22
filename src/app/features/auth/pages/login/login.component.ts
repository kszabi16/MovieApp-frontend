import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';
import { LoginDto } from '../../../../core/models/auth.models';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  model: LoginDto = {
    email: '',
    password: ''
  };

  isLoading = false;
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  submit() {
    this.error = '';
    this.isLoading = true;

    this.authService.login(this.model).subscribe({
      next: () => {
        const role = this.authService.role;
        this.isLoading = false;

        if (role === 'Admin') {
          this.router.navigate(['/admin-dashboard']);
        } else {
          this.router.navigate(['/user-dashboard']);
        }
      },
      error: err => {
        console.log('LOGIN ERROR:', err);
        this.isLoading = false;
        this.error = err.status === 401
          ? 'Hibás email vagy jelszó'
          : (err.error?.message ?? 'Váratlan hiba történt');
      }
    });
  }
}
