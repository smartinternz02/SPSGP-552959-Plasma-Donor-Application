// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAdmin(): boolean {
    // Logic to check if user is an admin
    return true; // Replace with your authentication logic
  }

  isUser(): boolean {
    // Logic to check if user is a regular user
    return true; // Replace with your authentication logic
  }
}
