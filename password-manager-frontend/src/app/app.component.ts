import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PasswordPageComponent } from "./password-page/password-page.component";
import { HttpClientModule } from '@angular/common/http';
import { AddPasswordComponent } from "./add-password/add-password.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PasswordPageComponent, AddPasswordComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
