import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {

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

    this.http.post("http://localhost:8000/admin/register", data, { responseType: 'text' }).subscribe((resultData: any) => {
      console.log("registering with ", data);
      alert("Registered Successfully");
      this.name = '';
      this.email = '';
      this.password = '';
      this.showLoginForm = true;
    });
  }

  login() {
    const data = {
      "email": this.email,
      "password": this.password
    };

    this.http.post("http://localhost:8000/admin/login", data, { responseType: 'text' }).subscribe((resultData: any) => {
      console.log("logging in with ", data);
      alert("Logged in Successfully");
      this.router.navigate(['donation-table']);
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