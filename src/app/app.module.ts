import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { CalcultorComponent } from './calcultor/calcultor.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { FeedbackService } from './feedback.service';
import { CartService } from './cart.service';
import { CalculatorService } from './calculator.service';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CartComponent,
    CalcultorComponent,
    FeedbackComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot([]),
    FormsModule, 
    HttpClientModule, 
    AppRoutingModule
  ],
  providers: [
    FeedbackService,
    CartService,
    CalculatorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
