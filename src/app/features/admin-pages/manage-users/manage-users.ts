import { Component, OnInit } from '@angular/core';
import { UserApiService, UserProfile } from '../../../core/services/user-profile.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { create } from 'domain';

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


isFormOpen = false;
isEditing = false;

formModel = {
  id: 0,
  username: '',
  email: '',
  role: 'User',
  password: '',
  createdAt: ''
};

  constructor(private userApi: UserApiService) {}

  ngOnInit(): void {
    this.loadUsers();
  }
 
openAddForm() {
  this.isFormOpen = true;
  this.isEditing = false;

  this.formModel = {
    id: 0,
    username: '',
    email: '',
    role: 'User',
    password: '',
    createdAt: ''
  };
}




createUser() {
  this.userApi.createUser(this.formModel).subscribe({
    next: () => {
      this.isFormOpen = false;
      this.loadUsers();
    },
    error: err => console.error(err)
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


updateUser() {
  this.userApi.updateUser(this.formModel).subscribe({
    next: () => {
      this.isFormOpen = false;
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



// ===== Szerkesztés =====
openEditForm(user: UserProfile) {
  this.isFormOpen = true;
  this.isEditing = true;

  this.formModel = {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
    password: '',
    createdAt:''   // jelszó nem változik
  };
}

// ===== MENTÉS VAGY HOZZÁADÁS =====
saveForm() {
  if (this.isEditing) {
    // FELHASZNÁLÓ MÓDOSÍTÁSA
    this.userApi.updateUser(this.formModel).subscribe(() => {
      this.isFormOpen = false;
      this.loadUsers();
    });
  } else {
    // ÚJ FELHASZNÁLÓ HOZZÁADÁSA
    this.userApi.createUser(this.formModel).subscribe(() => {
      this.isFormOpen = false;
      this.loadUsers();
    });
  }
}

cancelForm() {
  this.isFormOpen = false;
}

}


