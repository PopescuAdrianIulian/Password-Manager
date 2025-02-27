import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Password } from '../../data/model/Password';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add-password',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './add-password.component.html',
  styleUrl: './add-password.component.css',
})
export class AddPasswordComponent {
  passwordForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.passwordForm = this.fb.group({
      websiteUrl: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  onSubmit() {
    const p: Password = this.passwordForm.value;
    this.http.post('http://localhost:8080/password', p).subscribe({
      next: (response) => {
        alert('Password added successfully');
        console.log(response);
        this.passwordForm.reset();
        this.router.navigate(['/passwords']);
      },
    });
  }
}
