import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { body } from 'express-validator';

@Component({
  selector: 'app-plasma-donation',
  templateUrl: './plasma-donation.component.html',
  styleUrls: ['./plasma-donation.component.css']
})
export class PlasmaDonationComponent {

  DonorsDetails: any[] = [];
  filteredDonors: any[] = [];
  searchQuery: string = '';

  constructor(private router: Router, private http: HttpClient) {
    this.getAllDonorsDetails();
  }

  getAllDonorsDetails() {
    this.http.get("http://localhost:8000/admin/getAll").subscribe((resultData: any) => {
      console.log(resultData);
      this.DonorsDetails = resultData.data.data;
      this.filteredDonors = this.DonorsDetails; // Initialize filteredDonors with all donors initially
    });
  }

  searchDonors() {
    if (this.searchQuery.trim() === '') {
      this.filteredDonors = this.DonorsDetails; // If search query is empty, show all donors
    } else {
      const query = this.searchQuery.toLowerCase().trim();
      this.filteredDonors = this.DonorsDetails.filter(
        (donor: any) =>
          donor.name.toLowerCase().includes(query) || donor.bloodGroup.toLowerCase().includes(query)
      );
    }
  }

  // Rest of the code

  name: string = '';
  email: string = '';
  phone: string = '';
  bloodGroup: string = '';
  address: string = '';
  state: string = '';
  status: string = 'pending'; // Set the default status as "pending"

  save(event: Event) {
    event.preventDefault();

    if (!this.validateForm()) {
      return; // Abort form submission if validation fails
    }

    let bodyData = {
      "name": this.name,
      "email": this.email,
      "phone": this.phone,
      "bloodGroup": this.bloodGroup,
      "address": this.address,
      "state": this.state,
      "status": this.status // Add the status field to the request
    };

    this.http.post("http://localhost:8000/admin/create", bodyData).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Created");
      this.router.navigate(['/donor-table']);
      this.name = "";
      this.email = "";
      this.phone = "";
      this.bloodGroup = "";
      this.address = "";
      this.state = "";
      this.status = "pending"; // Reset the status to "pending" after submission
    });
  }

  validateForm(): boolean {
    if (
      this.name.trim() === '' ||
      this.email.trim() === '' ||
      this.phone.trim() === '' ||
      this.bloodGroup.trim() === '' ||
      this.address.trim() === '' ||
      this.state.trim() === ''
    ) {
      alert("Please fill in all fields.");
      return false; // Validation failed
    }

    return true; // Validation passed
  }

}
