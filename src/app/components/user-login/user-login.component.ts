import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {

  showLoginForm: boolean = true;
  constructor(private router: Router, private http: HttpClient) { }
  
  name: string = "";
  email: string = "";
  password: string = "";

  register() {
    const data = {
      "name": this.name,
      "email": this.email,
      "password": this.password
    };

    this.http.post("http://localhost:8000/user/register", data, { responseType: 'text' }).subscribe((resultData: any) => {
      console.log("Registering with ", data);
      alert("Registered Successfully");
      this.name = '';
      this.email = '';
      this.password = '';

      // Route to the login form
      this.showLoginForm = true;
    });
  }

  login() {
    const data = {
      "email": this.email,
      "password": this.password
    };

    this.http.post("http://localhost:8000/user/login", data, { responseType: 'text' }).subscribe((resultData: any) => {
      console.log("Logging in with ", data);
      alert("Logged in Successfully");
      this.router.navigate(['/donate-plasma']);
      this.email = '';
      this.password = '';
    });
  }

  toggleForm(showLogin: boolean) {
    this.showLoginForm = showLogin;
    // Clear form fields when toggling forms
    this.name = "";
    this.email = "";
    this.password = "";
  }
}
