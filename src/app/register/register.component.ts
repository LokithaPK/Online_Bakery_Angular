import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from './registration.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private registrationService: RegistrationService, private router: Router) { }

  onSubmit() {
    const userData = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.registrationService.registerUser(userData).subscribe(
      response => {
        console.log('User registered successfully:', response);
        this.router.navigate(['/login']); 
      },
      error => {
        console.error('Error registering user:', error);
        this.errorMessage = error.error.message;
      }
    );
  }
}
