import { Component, OnInit } from '@angular/core';
import { UserApiService, UserProfile } from '../../../core/services/user-profile.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.html',
  styleUrls: ['./manage-users.css'],
  imports: [CommonModule, FormsModule,RouterModule]
})
export class ManageUsersComponent implements OnInit {

  users: UserProfile[] = [];
  loading = true;
  error: string | null = null;


  selectedUser: UserProfile | null = null; // szerkesztéshez
  editMode = false;
  addMode: boolean = false;
newUser: UserProfile = {
  id: 0,
  username: '',
  email: '',
  role: 'User',
  createdAt: ''
};

  constructor(private userApi: UserApiService) {}

  ngOnInit(): void {
    this.loadUsers();
  }
  openAddModal() {
  this.addMode = true;
  this.newUser = {
    id: 0,
    username: '',
    email: '',
    role: 'User',
    createdAt: ''
  };
}

cancelAdd() {
  this.addMode = false;
}

createUser() {
  this.userApi.createUser(this.newUser).subscribe({
    next: () => {
      this.addMode = false;
      this.loadUsers();
    },
    error: err => {
      console.error(err);
    }
  });
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

  editUser(user: UserProfile) {
    this.selectedUser = { ...user };
    this.editMode = true;
  }

  saveUser() {
    if (!this.selectedUser) return;

    this.userApi.updateUser(this.selectedUser).subscribe({
      next: () => {
        this.editMode = false;
        this.selectedUser = null;
        this.loadUsers();
      }
    });
  }

  deleteUser(id: number) {
    if (!confirm('Biztos törlöd a felhasználót?')) return;

    this.userApi.deleteUser(id).subscribe({
      next: () => {
        this.users = this.users.filter(u => u.id !== id);
      }
    });
  }

  cancelEdit() {
    this.editMode = false;
    this.selectedUser = null;
  }
}
