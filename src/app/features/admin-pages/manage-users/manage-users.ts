import { Component, OnInit } from '@angular/core';
import { UserService, UserProfile } from '../../../core/services/user-profile.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.html',
  styleUrls: ['./manage-users.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class ManageUsersComponent implements OnInit {

  users: UserProfile[] = [];
  loading = true;
  error: string | null = null;

  isFormOpen = false;
  isEditing = false;

  formModel: UserProfile = {
    id: 0,
    username: '',
    email: '',
    role: 'User',
    password: '',
    createdAt: ''
  };

  constructor(private userApi: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.userApi.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Nem sikerült betölteni a felhasználókat.';
        this.loading = false;
      }
    });
  }

  openEditForm(user?: UserProfile) {
    this.isFormOpen = true;
    
    if (user) {
      this.isEditing = true;
      this.formModel = { ...user, password: '' }; 
    } else {
      this.isEditing = false;
      this.formModel = {
        id: 0,
        username: '',
        email: '',
        role: 'User',
        password: '',
        createdAt: new Date().toISOString()
      };
    }
  }

  saveForm() {
    if (this.isEditing) {
      this.userApi.updateUser(this.formModel).subscribe({
        next: () => {
          this.isFormOpen = false;
          this.loadUsers();
        },
        error: (err) => console.error('Hiba frissítéskor:', err)
      });
    } else {
      this.userApi.createUser(this.formModel).subscribe({
        next: () => {
          this.isFormOpen = false;
          this.loadUsers();
        },
        error: (err) => console.error('Hiba létrehozáskor:', err)
      });
    }
  }

  deleteUser(id: number) {
    if (!confirm('Biztos törlöd a felhasználót?')) return;

    this.userApi.deleteUser(id).subscribe({
      next: () => {
        this.users = this.users.filter(u => u.id !== id);
      },
      error: (err) => console.error('Hiba törléskor:', err)
    });
  }

  cancelForm() {
    this.isFormOpen = false;
  }
}