import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';
import { RegisterDto } from '../../../../core/models/auth.models';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  model: RegisterDto = {
    username: '',
    email: '',
    password: ''
  };

  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  submit() {
    this.error = '';

    this.authService.register(this.model).subscribe({
      next: () => {
        // sikeres regisztráció → irány login / vagy movies
        this.router.navigate(['/login']);
      },
      error: err => {
        this.error = err.error?.message ?? 'Hiba történt';
      }
    });
  }
}
