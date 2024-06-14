import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  cartItems: { name: string, price: number }[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const name = params['name'];
      const price = +params['price']; 
      if (name && price) {
        this.cartService.addToCart({ name: name, price: price });
      }
    });

    this.cartItems = this.cartService.getItems();
  }

  removeItem(index: number) {
    this.cartService.removeFromCart(index);
    this.cartItems = this.cartService.getItems(); 
  }

  goToCalculator() {
    const cartItems = JSON.stringify(this.cartItems);
    this.router.navigate(['/calcultor'], { queryParams: { cartItems: cartItems } });
  }
}
