import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-donation-table',
  templateUrl: './donation-table.component.html',
  styleUrls: ['./donation-table.component.css']
})
export class DonationTableComponent implements OnInit {

  DonorsDetails: any[] = [];
  filteredDonors: any[] = [];
  currentDonorID = '';
  searchQuery: string = '';

  name: string = '';
  email: string = '';
  phone: string = '';
  bloodGroup: string = '';
  address: string = '';
  state: string = '';
  status: string = ''; // New property to store the status value
  dateTime: string = ''; // New property to store the date and time value

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.getAllDonorsDetails();
  }

  getAllDonorsDetails() {
    this.http.get('http://localhost:8000/admin/getAll').subscribe((resultData: any) => {
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

  validateForm(): boolean {
    if (this.status.trim() === '') {
      alert('Please fill in all fields.');
      return false; // Validation failed
    }
    return true; // Validation passed
  }

  setUpdate(data: any) {
    this.currentDonorID = data._id;
    this.status = data.status; // Set the status property with the donor's existing status
  }

  UpdateRecord() {
    if (!this.validateForm()) {
      return; // Don't proceed with update if validation fails
    }

    const bodyData = {
      status: this.status,
      dateTime: this.dateTime // Add the dateTime property to the request body
    };
    this.http.patch('http://localhost:8000/admin/update' + "/" + this.currentDonorID, bodyData)
      .subscribe(
        (resultData: any) => {
          console.log(resultData);
          alert('Updated');
          this.getAllDonorsDetails();
          // Reset the form fields after successful update
          this.currentDonorID = '';
          this.status = '';
          this.dateTime = '';
        },
        (error: any) => {
          console.error(error);
          alert('Error occurred while updating the record.');
        }
      );
  }

  edit() {
    if (this.currentDonorID === '') {
      // Handle the case where currentDonorID is empty (not set).
      // You can add code here to show an error message or take other actions.
    } else {
      this.UpdateRecord();
    }
  }

  setDelete(data: any) {
    this.currentDonorID = data._id;
    this.status = 'rejected'; // Set the status to 'rejected' before deleting.
    this.scheduleDeletion();
  }

  scheduleDeletion() {
    // Update the status to 'rejected'
    const bodyData = {
      status: this.status
    };
    this.http.patch('http://localhost:8000/admin/update' + "/" + this.currentDonorID, bodyData)
      .subscribe(
        (resultData: any) => {
          console.log(resultData);
          alert('Status updated. Deleting record in 1 minute...');
          // Schedule the deletion after 1 minute
          setTimeout(() => {
            this.DeleteRecord();
          }, 60000); // 60000 milliseconds = 1 minute
          this.getAllDonorsDetails();
        },
        (error: any) => {
          console.error(error);
          alert('Error occurred while updating the record.');
        }
      );
  }

  DeleteRecord() {
    this.http.delete("http://localhost:8000/admin/remove" + "/" + this.currentDonorID).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Deleted");
      this.getAllDonorsDetails();
    });
  }

}
