import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Product {
  name: string;
  price: number;
  image: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  constructor(private router: Router) {}

  addToCart(product: Product) {
    
    this.router.navigate(['/cart'], { queryParams: { name: product.name, price: product.price } });
  }
}
