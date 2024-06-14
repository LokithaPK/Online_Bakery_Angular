import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: { name: string, price: number }[] = [];

  addToCart(item: { name: string, price: number }) {
    this.items.push(item);
  }

  getItems() {
    return this.items;
  }

  removeFromCart(index: number) {
    this.items.splice(index, 1);
  }
}
