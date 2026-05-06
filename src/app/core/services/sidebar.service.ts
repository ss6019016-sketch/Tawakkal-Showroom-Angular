// sidebar.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SidebarService {
  // BehaviorSubject to track collapsed state
  private collapsedSubject = new BehaviorSubject<boolean>(false);
  isCollapsed$ = this.collapsedSubject.asObservable();

  toggle() {
    this.collapsedSubject.next(!this.collapsedSubject.value);
  }

  collapse() {
    this.collapsedSubject.next(true);
  }

  expand() {
    this.collapsedSubject.next(false);
  }
}
