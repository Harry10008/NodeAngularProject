import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import  Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  receivedData: any[] = [];
  storedData: any[] = [];
  data: any = [];
  error: string = '';
  editindex: number | null = null;
  welcomeMessage: any;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const usersDetail = JSON.parse(localStorage.getItem('Users') || '[]');
    this.storedData = usersDetail;

    this.fetchData();

    const user = localStorage.getItem('user'); // Default to an empty object if not found
    if (user) {
      this.welcomeMessage = `Welcome, ${user}`; // Set the welcome message using user data
    } else {
      this.welcomeMessage = 'Welcome, Guest!'; // Default message if no user data is found
    }
    //console.log(this.welcomeMessage);
  }

  fetchData() {
    this.http.get<any>('http://localhost:3001/admin/UserWithOrd').subscribe(
      (response) => {
        if(response.message == 'Invalid or expired token'){
          localStorage.removeItem('user')
          this.router.navigate(['']);  // Redirect to login page
          this.toastr.error('Invalid or expired token!!!!')
        }
        
        this.data = response.data; // Store the response data
        //console.log(this.data);
      },
      (error) => {
        this.error = 'An error occurred while fetching data.'; // Handle errors
      }
    );
  }

  handleDataChange(data: any[]): void {
    this.receivedData = data;
    localStorage.setItem('Users', JSON.stringify(this.receivedData));
    this.storedData = [...this.receivedData];
    console.log(this.receivedData, 'Updated receivedData');
  }

  deleteUser(email: any): void {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you really want to delete this user?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel',
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.http.delete('http://localhost:3001/user/delete?email=' + email).subscribe(
              (response) => {
                this.fetchData();
              },
              (error) => {
                this.error = 'An error occurred while fetching data.';
              }
            );
          this.toastr.success('User deleted sucessfully');
        }
      });
    } catch (error) {
      this.toastr.error('Error deleting User');
      
    }
  }
  
  editUser(id: number): void {
    const user = this.data; 
    const userToEdit = user.find((u:any) => u.id === id);
    
    if (userToEdit) {
      this.router.navigate(['/save'], {
        state: { user: userToEdit, editIndex: id },
      });
    } else {
      this.toastr.error('Error deleting User');
    }
  }
}
