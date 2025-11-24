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

  // Modal állapota
  isFormOpen = false;
  isEditing = false;

  // Form modell inicializálása
  formModel: UserProfile = {
    id: 0,
    username: '',
    email: '',
    role: 'User',
    password: '',
    createdAt: ''
  };

  // FIGYELEM: Ha a te service-ed neve UserApiService, cseréld ki itt a típust!
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

  // ===== EGYIESÍTETT FORM MEGNYITÁS (JAVÍTVA) =====
  // A user paraméter most opcionális (?). 
  // Ha van user, akkor SZERKESZTÉS. Ha nincs, akkor HOZZÁADÁS.
  openEditForm(user?: UserProfile) {
    this.isFormOpen = true;
    
    if (user) {
      // Szerkesztés mód
      this.isEditing = true;
      // Másolat készítése az adatokról (hogy ne írjuk felül a táblázatot azonnal)
      this.formModel = { ...user, password: '' }; 
    } else {
      // Hozzáadás mód (Reset)
      this.isEditing = false;
      this.formModel = {
        id: 0,
        username: '',
        email: '',
        role: 'User',
        password: '', // Jelszó kötelező lesz új usernél
        createdAt: new Date().toISOString()
      };
    }
  }

  // ===== MENTÉS (KÖZÖS FÜGGVÉNY) =====
  saveForm() {
    if (this.isEditing) {
      // UPDATE
      this.userApi.updateUser(this.formModel).subscribe({
        next: () => {
          this.isFormOpen = false;
          this.loadUsers();
        },
        error: (err) => console.error('Hiba frissítéskor:', err)
      });
    } else {
      // CREATE
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
        // UI frissítése kérés nélkül
        this.users = this.users.filter(u => u.id !== id);
      },
      error: (err) => console.error('Hiba törléskor:', err)
    });
  }

  cancelForm() {
    this.isFormOpen = false;
  }
}