import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/core/services/account.service';
import { Account } from 'src/app/models/Account.model';

@Component({
  selector: 'app-chart-of-account',
  templateUrl: './chart-of-account.component.html',
  styleUrls: ['./chart-of-account.component.css']
})
export class ChartOfAccountComponent implements OnInit {

  account: Account = this.getEmpty();

  accountList: Account[] = [];
  paginatedAccounts: Account[] = [];

  editMode = false;
  editId: string | null = null;

  accountTypes = [
    { id: 1, name: 'Asset' },
    { id: 2, name: 'Liability' },
    { id: 3, name: 'Equity' },
    { id: 4, name: 'Income' },
    { id: 5, name: 'Expense' }
  ];

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {

    this.accountService.getAllAccounts().subscribe({
      next: res => {

        this.accountList = res;
        this.paginatedAccounts = res;

      }
    });

  }

  onPageChange(data: Account[]) {

    this.paginatedAccounts = data;

  }

  seed() {

    this.accountService.seedAccounts().subscribe(() => {

      this.load();

      alert('Default accounts add ho gaye!');

    });

  }

  onSubmit(form: any) {

    if (form.invalid) return;

    if (this.editMode && this.editId) {

      this.account.id = this.editId;

      this.accountService.updateAccount(this.account).subscribe(() => {

        this.load();
        this.reset();

      });

    } else {

      this.accountService.createAccount(this.account).subscribe(() => {

        this.load();
        this.reset();

      });

    }

  }

  edit(a: Account) {

    if (a.isSystem) {

      alert('System account edit nahi ho sakta!');
      return;

    }

    this.account = { ...a };

    this.editMode = true;
    this.editId = a.id!;

  }

  delete(a: Account) {

    if (a.isSystem) {

      alert('System account delete nahi ho sakta!');
      return;

    }

    if (!confirm('Delete karna chahte ho?')) return;

    this.accountService.deleteAccount(a.id!).subscribe(() => {

      this.load();

    });

  }

  reset() {

    this.account = this.getEmpty();

    this.editMode = false;
    this.editId = null;

  }

  getTypeName(typeId: number): string {

    const type = this.accountTypes.find(t => t.id === typeId);

    return type ? type.name : '';

  }

  getEmpty(): Account {

    return {
      code: '',
      name: '',
      accountType: 1
    };

  }

}