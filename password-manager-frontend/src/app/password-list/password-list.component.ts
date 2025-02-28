import { Component } from '@angular/core';
import { PasswordItemComponent } from '../password-item/password-item.component';
import { NgFor } from '@angular/common';
import { Password } from '../../data/model/Password';
import { PasswordService } from '../../data/service/password.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-password-list',
  standalone: true,
  imports: [PasswordItemComponent, NgFor, HttpClientModule, FormsModule],
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.css'],
})
export class PasswordListComponent {
  passwords: Password[] = [];
  searchUsername: string = '';
  filteredPasswords: Password[] = [];

  constructor(private passwordService: PasswordService) {}

  ngOnInit() {
    this.passwordService.getAll().subscribe((response) => {
      console.log(response);
      this.passwords = response;
      this.filteredPasswords = [...this.passwords];
    });
  }

  filterPasswords() {
    if (this.searchUsername) {
      this.filteredPasswords = this.passwords.filter(password =>
        password.username.toLowerCase().includes(this.searchUsername.toLowerCase())
      );
    } else {
      this.filteredPasswords = [...this.passwords];
    }
  }
}
