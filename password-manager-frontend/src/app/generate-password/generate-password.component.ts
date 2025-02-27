import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-generate-password',
  standalone: true,
  imports: [FormsModule, NgIf, RouterLink],
  templateUrl: './generate-password.component.html',
  styleUrl: './generate-password.component.css'
})
export class GeneratePasswordComponent {
  passwordLength: number = 12;
  generatedPassword: string | null = null;

  generatePassword(): void {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?/";
    let password = "";
    for (let i = 0; i < this.passwordLength; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    this.generatedPassword = password;
  }
  copyPassword() {
    if (this.generatedPassword) {
      navigator.clipboard.writeText(this.generatedPassword).then(() => {
        alert('Password copied to clipboard!');
      }).catch(err => {
        console.error('Error copying password: ', err);
      });
    }
  }
}

