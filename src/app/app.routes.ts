import { Routes } from '@angular/router';
import { roleGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { RegisterComponent } from './features/auth/pages/register/register.component';

import { AdminDashboardComponent } from '../app/features/dashboards/admin-dashboard/admin-dashboard..component';
import { UserDashboardComponent } from './features/dashboards/user-dashboard/user-dashboard..component';

import { UserFavoritesComponent } from './features/user-favorites/user-favorites.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { 
    path: 'admin-dashboard', 
    component: AdminDashboardComponent, 
    canActivate: [roleGuard('Admin')] 
  },

  { 
    path: 'user-dashboard', 
    component: UserDashboardComponent, 
    canActivate: [roleGuard('User')] 
  },

  { 
  path: 'favorites',
  component: UserFavoritesComponent,
  canActivate: [roleGuard('User')]
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];