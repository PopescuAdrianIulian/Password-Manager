import { Routes } from '@angular/router';
import { AddPasswordComponent } from './add-password/add-password.component';
import { PasswordPageComponent } from './password-page/password-page.component';
import { GeneratePasswordComponent } from "./generate-password/generate-password.component";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {AuthGuard} from "../data/service/authguard";

export const routes: Routes = [
  { path: '', redirectTo: 'passwords', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'add-password', component: AddPasswordComponent, canActivate: [AuthGuard] },
  { path: 'passwords', component: PasswordPageComponent, canActivate: [AuthGuard] },
  { path: 'generate-password', component: GeneratePasswordComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'passwords' }
];
