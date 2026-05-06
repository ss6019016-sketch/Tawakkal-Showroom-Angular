import { Component } from '@angular/core';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent {
  roles = [
    { name: 'Admin',   description: 'Poora system access', color: 'danger' },
    { name: 'Manager', description: 'Reports + Vouchers dekh sakta hai', color: 'warning' },
    { name: 'Cashier', description: 'Sirf purchase/sales enter kar sakta hai', color: 'success' },
    { name: 'Viewer',  description: 'Sirf reports dekh sakta hai', color: 'secondary' }
  ];
}