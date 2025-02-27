import { Component } from '@angular/core';
import { PasswordListComponent } from '../password-list/password-list.component';
import { Router, RouterLink, RouterModule } from '@angular/router';
import {FormsModule} from "@angular/forms";
@Component({
  selector: 'app-password-page',
  standalone: true,
  imports: [PasswordListComponent, RouterLink,FormsModule],
  templateUrl: './password-page.component.html',
  styleUrl: './password-page.component.css',
})
export class PasswordPageComponent {
  private router: Router;

  constructor(router: Router) {
    this.router = router;
  }



  addPassword() {
    this.router.navigate(['/new-password']);
  }
}
