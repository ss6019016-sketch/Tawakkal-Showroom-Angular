import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  showPassword = false;
  showConfirmPassword = false;
  isLoading = false;

  errors = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onRegister(): void {
    // Clear previous errors
    this.clearErrors();

    // Validate form
    if (!this.validateForm()) {
      return;
    }

    this.isLoading = true;

    this.authService.register({
      name: this.name,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    }).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success) {
          alert('Registration successful! Please login.');
          this.router.navigate(['/login']);
        } else {
          alert(response.message || 'Registration failed');
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Registration error:', error);
        
        // Handle validation errors from backend
        if (error.error?.errors) {
          const backendErrors = error.error.errors;
          if (Array.isArray(backendErrors)) {
            backendErrors.forEach((err: string) => {
              alert(err);
            });
          }
        } else {
          alert(error.error?.message || 'Registration failed. Please try again.');
        }
      }
    });
  }

  validateForm(): boolean {
    let isValid = true;

    // Validate name
    if (!this.name || this.name.trim().length === 0) {
      this.errors.name = 'Name is required';
      isValid = false;
    } else if (this.name.length > 100) {
      this.errors.name = 'Name must be less than 100 characters';
      isValid = false;
    }

    // Validate email
    if (!this.email || this.email.trim().length === 0) {
      this.errors.email = 'Email is required';
      isValid = false;
    } else if (!this.isValidEmail(this.email)) {
      this.errors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Validate password
    if (!this.password || this.password.length === 0) {
      this.errors.password = 'Password is required';
      isValid = false;
    } else if (this.password.length < 6) {
      this.errors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    // Validate confirm password
    if (!this.confirmPassword || this.confirmPassword.length === 0) {
      this.errors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (this.password !== this.confirmPassword) {
      this.errors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    return isValid;
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  clearErrors(): void {
    this.errors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}