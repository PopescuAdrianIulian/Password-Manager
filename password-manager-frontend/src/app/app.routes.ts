import { Routes } from '@angular/router';
import { AddPasswordComponent } from './add-password/add-password.component';
import { PasswordPageComponent } from './password-page/password-page.component';
import {GeneratePasswordComponent} from "./generate-password/generate-password.component";

export const routes: Routes = [
  { path: '', redirectTo: 'passwords', pathMatch: 'full' },
  { path: 'add-password', component: AddPasswordComponent },
  { path: 'passwords', component: PasswordPageComponent },
  { path: 'generate-password', component: GeneratePasswordComponent }


];
