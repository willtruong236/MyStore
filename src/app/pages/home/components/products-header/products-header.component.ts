import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html',
  styleUrls: ['./products-header.component.css'],
})
export class ProductsHeaderComponent {
  @Output() columnChange = new EventEmitter<number>();
  @Output() itemCountChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();

  sort = 'Descending';
  itemCount = 12;

  onSortUpdate(sort: string): void {
    this.sort = sort;
    this.sortChange.emit(sort);
  }

  onCountUpdate(count: number): void {
    this.itemCount = count;
    this.itemCountChange.emit(count);
  }

  onColumnUpdate(col: number): void {
    this.columnChange.emit(col);
  }
}
