import {Component} from '@angular/core';
import {PasswordListComponent} from '../password-list/password-list.component';
import {RouterLink} from '@angular/router';
import {FormsModule} from "@angular/forms";


@Component({
  selector: 'app-password-page',
  standalone: true,
  imports: [PasswordListComponent, RouterLink, FormsModule],
  templateUrl: './password-page.component.html',
  styleUrl: './password-page.component.css',
})
export class PasswordPageComponent {
}
