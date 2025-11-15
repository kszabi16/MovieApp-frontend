import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard = (expectedRole: string): CanActivateFn => {

  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (!authService.isLoggedIn) {
      console.log('RoleGuard: Nincs bejelentkezve, átirányítás /login-ra');
      router.navigate(['/login']);
      return false; 
    }

    const userRole = authService.role;

    if (userRole === expectedRole) {
      return true; 
    }

    console.warn(`RoleGuard: Jogosulatlan hozzáférés (várt: ${expectedRole}, kapott: ${userRole})`);
    if (userRole === 'Admin') {
      router.navigate(['/admin-dashboard']);
    } else if (userRole === 'User') {
      router.navigate(['/user-dashboard']);
    } else {
      authService.logout();
      router.navigate(['/login']);
    }
    
    return false;
  };
};