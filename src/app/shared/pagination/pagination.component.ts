import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html'
})
export class PaginationComponent implements OnChanges {

  @Input() data: any[] = [];
  @Input() pageSize = 5;

  @Output() pagedData = new EventEmitter<any[]>();

  currentPage = 1;
  totalPages = 0;

  ngOnChanges() {
    this.calculate();
  }

  calculate() {
    this.totalPages = Math.ceil(this.data.length / this.pageSize);
    this.goTo(1);
  }

  get paginatedData() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.data.slice(start, start + this.pageSize);
  }

  goTo(page: number) {
    this.currentPage = page;
    this.pagedData.emit(this.paginatedData);
  }

  next() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.goTo(this.currentPage);
    }
  }

  prev() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.goTo(this.currentPage);
    }
  }
}