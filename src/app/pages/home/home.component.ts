import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';

const ROWS_HEIGHT: { [ID: number]: number } = { 1: 400, 3: 355, 4: 350 };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  col = 3;
  rowHeight = ROWS_HEIGHT[this.col];
  category: string | undefined;
  products: Array<Product> | undefined;
  sort = 'desc';
  count = '12';
  productsSubscription: Subscription | undefined;

  constructor(
    private cartService: CartService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productsSubscription = this.storeService
      .getProducts(this.count, this.sort, this.category)
      .subscribe((_product) => {
        this.products = _product;
      });
  }

  onColumnChange(col: number): void {
    this.col = col;
    this.rowHeight = ROWS_HEIGHT[this.col];
  }

  onShowCategory(category: string): void {
    this.category = category;
    this.getProducts();
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    });
  }

  onItemCountChange(count: number): void {
    this.count = count.toString();
    this.getProducts();
  }

  onSortChange(sort: string) {
    if (sort === 'Descending') {
      this.sort = 'desc';
    } else {
      this.sort = 'asc';
    }
    this.getProducts();
  }

  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }
}
