import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { AppUser } from 'src/app/models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
paginatedUsers: any[] = [];
  user: AppUser = this.getEmpty();
  userList: AppUser[] = [];
  editMode = false;
  editId: string | null = null;
  showPassword = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
     this.load(); 
    }

  load() {
    this.userService.getAll().subscribe({ next: res => this.userList = res });
  }

  onSubmit(form: any) {
    if (form.invalid) return;

    if (this.editMode && this.editId) {
      this.user.id = this.editId;
      this.userService.update(this.user).subscribe({
        next: () => { this.load(); this.reset(); },
        error: (err) => alert(err.error)
      });
    } else {
      this.userService.create(this.user).subscribe({
        next: () => { this.load(); this.reset(); },
        error: (err) => alert(err.error)
      });
    }
  }

  edit(u: AppUser) {
    this.user = { ...u, password: '' };
    this.editMode = true;
    this.editId = u.id!;
  }

  delete(id: string) {
    if (!confirm('User delete karna chahte ho?')) return;
    this.userService.delete(id).subscribe(() => this.load());
  }

  toggleStatus(id: string) {
    this.userService.toggleStatus(id).subscribe(() => this.load());
  }

  reset() {
    this.user = this.getEmpty();
    this.editMode = false;
    this.editId = null;
    this.showPassword = false;
  }

  getEmpty(): AppUser {
    return {  name: '',
    email: '',
    password: '',
    role: 'Viewer'};
  }
  onPageChange(data: any[]) {
  this.paginatedUsers = data;
} 
}