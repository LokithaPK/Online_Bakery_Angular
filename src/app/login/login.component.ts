import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  login() {
    this.http.post<any>('http://localhost:3000/api/login', { email: this.email, password: this.password }).subscribe(
      res => {
        if (res.userType === 'admin') {
          // Redirect to admin dashboard if needed
          this.router.navigate(['/admin-dashboard']);
        } else if (res.userType === 'customer') {
          // Redirect to home page or customer dashboard
          this.router.navigate(['/home']); // Adjust '/home' to your actual home page route
        }
      },
      err => {
        console.error(err);
        this.errorMessage = 'Invalid credentials';
      }
    );
  }
}
