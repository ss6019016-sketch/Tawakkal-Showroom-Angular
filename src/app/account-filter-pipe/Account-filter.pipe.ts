import { Pipe, PipeTransform } from '@angular/core';
import { Account } from '../models/Account.model';

@Pipe({ name: 'accountFilter' })
export class AccountFilterPipe implements PipeTransform {
  transform(accounts: Account[], type: number): Account[] {
    return accounts.filter(a => a.accountType === type);
  }
}