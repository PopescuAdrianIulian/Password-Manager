import {NgIf} from '@angular/common';
import {Component, Input} from '@angular/core';
import {Password} from '../../data/model/Password';
import {PasswordService} from '../../data/service/password.service';
import {HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-password-item',
  standalone: true,
  imports: [NgIf, HttpClientModule],
  templateUrl: './password-item.component.html',
  styleUrl: './password-item.component.css',
})
export class PasswordItemComponent {
  @Input() password: any;
  showModal = false;

  constructor(private passwordService: PasswordService) {
  }

  showCredentials(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }


  deletePassword(): void {
    if (confirm('Are you sure you want to delete this password?')) {
      this.passwordService.deletePassword(this.password.id).subscribe()
      window.location.reload();
    }
  }
}
