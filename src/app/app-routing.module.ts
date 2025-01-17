import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { CalcultorComponent } from './calcultor/calcultor.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { RegisterComponent } from './register/register.component';
const routes: Routes = [
    {path:'login',component:LoginComponent},
    {path:'home',component:HomeComponent},
    {path:'cart',component:CartComponent},
    {path:'calcultor',component:CalcultorComponent},
    {path:'feedback',component:FeedbackComponent},
    { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
