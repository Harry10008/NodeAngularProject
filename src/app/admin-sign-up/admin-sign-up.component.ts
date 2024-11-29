import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-sign-up',
  templateUrl: './admin-sign-up.component.html',
  styleUrls: ['./admin-sign-up.component.css']
})
export class AdminSignUPComponent implements OnInit {
  adminDetails!: FormGroup;

  constructor(private toastr: ToastrService, private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.adminDetails = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(50)]),
      Password: new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(6)]),
    });
  }

  async onSubmit(): Promise<void> {
    if (this.adminDetails.valid) {
      const adminData = this.adminDetails.value;
  
      try {
        const emailDetails: any = await this.http.get<any>("http://localhost:3001/admin/fetch").toPromise();
  
        const emailExists = emailDetails.details.some((admin: any) => admin.email === adminData.email);
  
        if (emailExists) {
          this.toastr.error("Error: Admin with this email already exists.");
          console.log("Email already exists:", adminData.email);
        } else {
          await this.http.post<any>("http://localhost:3001/admin/save", adminData).toPromise();
          this.toastr.success("Admin details saved successfully!");
          console.log('Admin details saved:', adminData);
  
          this.adminDetails.reset();
          this.router.navigate(['/']);
        }
  
      } catch (error) {
        this.toastr.error("Error: Could not check existing email or save admin details.");
        console.error("HTTP request error: ", error);
      }
    } else {
      console.log('Form is invalid');
    }
  }
  
  
}
