import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const token = auth.token;
  const role = auth.role;

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  // If admin → admin dashboard
  if (role === "Admin") {
    router.navigate(['/admin-dashboard']);
    return false;
  }

  // If user → user dashboard
  if (role === "User") {
    router.navigate(['/user-dashboard']);
    return false;
  }

  router.navigate(['/login']);
  return false;
};
