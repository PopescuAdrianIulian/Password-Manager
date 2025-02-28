import { Component, OnInit } from '@angular/core';
import { PasswordService } from "../../data/service/password.service";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add-password',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './add-password.component.html',
  styleUrl: './add-password.component.css',
})
export class AddPasswordComponent implements OnInit {
  passwordForm!: FormGroup;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private passwordService: PasswordService
  ) {}

  ngOnInit() {
    this.passwordForm = this.fb.group({
      websiteUrl: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    if (this.passwordForm.valid) {
      this.passwordService.addPassword(this.passwordForm.value).subscribe({
        next: () => {
          this.router.navigate(['/passwords']);
        },
        error: (err) => {
          this.error = err.error?.error || 'Failed to add password. Please try again.';
        }
      });
    }
  }
}
