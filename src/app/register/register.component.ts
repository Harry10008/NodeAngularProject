import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  storedData: any[] = [];
  editIndex: number | null = null;
  hidePassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private http:HttpClient

  ) { }

  ngOnInit(): void {
    // Initialize the form
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(35)]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$'), Validators.maxLength(10)]],
      city: ['', Validators.required]
    });

    // Retrieve the state passed through the navigation
    if (history.state && history.state.user) {
      const { user, editIndex } = history.state;

      if (user && editIndex !== undefined) {
        //console.log('Edit mode: user', user); // Log the user object
       // console.log('Edit mode: editIndex', editIndex); // Log the editIndex

        this.editIndex = editIndex;  // Store the index for updating
        this.registerForm.patchValue({
          name: user.name,
          email: user.email,
          mobile: user.mobile,
          city: user.city
        });
      }
    }
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  preventNumbers(event: KeyboardEvent): void {
    const key = event.key;
    if (/\d/.test(key)) {
      event.preventDefault();
    }
  }

  async onSubmit(): Promise<void> {
    if (this.registerForm.valid) {
      const userData = this.registerForm.value;
  
      try {
        if (this.editIndex !== null) {
          // Update existing user
          const updateUrl = `http://localhost:3001/user/update/${this.editIndex}`; // Send id in the URL path
          await this.http.put<any>(updateUrl, userData).toPromise();
          this.toastr.success(`User details for ${userData.name} edited successfully!`);
        } else {
          // Save new user
          await this.http.post<any>("http://localhost:3001/user/save", userData).toPromise();
          this.toastr.success('User details added successfully!');
        }
      } catch (error) {
        this.toastr.error('Error saving user data');
        console.error('Error:', error);
        return;
      }
  
      this.resetForm();
      this.router.navigate(['/home']);
    }
  }
  resetForm(): void {
    this.editIndex = null;
    this.registerForm.reset();
  }
}