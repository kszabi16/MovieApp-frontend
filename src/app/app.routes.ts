import { Routes } from '@angular/router';
import { roleGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { RegisterComponent } from './features/auth/pages/register/register.component';

import { AdminDashboardComponent } from '../app/features/dashboards/admin-dashboard/admin-dashboard..component';
import { UserDashboardComponent } from './features/dashboards/user-dashboard/user-dashboard..component';

import { UserFavoritesComponent } from './features/user-favorites/user-favorites.component';

import { ProfileComponent } from './features/profile/profile.component';

import { RecommendationsComponent } from './features/recommendation/recommendation.component';

import { ManageMoviesComponent } from '../app/features/admin-pages/manage-movies/manage-movies';

import { LeaderboardComponent } from './features/leaderboard/leaderboard.component';
import { ManageUsersComponent } from './features/admin-pages/manage-users/manage-users';


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

  { 
    path: 'profile',
    component: ProfileComponent,
   canActivate: [roleGuard('User')]
  },

  {
    path: 'recommendations',
    component: RecommendationsComponent,
    canActivate: [roleGuard('User')]
  },

  { path: 'manage-movies',
    component: ManageMoviesComponent,
    canActivate: [roleGuard('Admin')] 
  },
  { path: 'manage-users',
    component: ManageUsersComponent,
    canActivate: [roleGuard('Admin')] 
  },

  {
  path: 'leaderboard',
  component: LeaderboardComponent,
  canActivate: [roleGuard('User')]
},
  

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];