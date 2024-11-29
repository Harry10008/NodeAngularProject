import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private router: Router, private toastr: ToastrService, private http: HttpClient) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      Password: new FormControl('', [Validators.required]),
    });
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) {
      this.toastr.error('Please fill in all required fields correctly.');
      return;
    }

    const { email, Password } = this.loginForm.value;

    try {
      const response = await this.http.post<any>("http://localhost:3001/admin/loginAdmin", {email, Password}).toPromise();
      console.log(response)

      // const storedUsers: any[] = JSON.parse(localStorage.getItem('adminDetails') || '[]');

      // const foundUser = storedUsers.find(user => user.email === email && user.password === Password);

      // if (foundUser) {
      //   console.log('Logged in as:', email);
      //   localStorage.setItem('user', email);  
      //   this.router.navigate(['/home']);  
      //   this.toastr.success('User login successful!');
      // } else {
      //   this.toastr.error('Invalid email or password!');
      // }
      if (response && response.token) {
      
        localStorage.setItem('user', email);  
        localStorage.setItem('authToken', response.token);  

        this.router.navigate(['/home']);  
        this.toastr.success('User login successful!');
      } else {
        console.log()
        this.toastr.error('Invalid email or password!');
      }

    } catch (error) {
      this.toastr.error('An error occurred while processing the login.');
    }
  }
}
