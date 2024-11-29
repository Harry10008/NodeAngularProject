import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr'; 

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  timeLeft: number = 300; 
  interval: any;

  constructor(
    private router: Router,
    private toastr: ToastrService 
  ) { }

  ngOnInit(): void {
    // Retrieve the saved timeLeft from localStorage (if it exists)
    const savedTime = localStorage.getItem('timeLeft');
    if (savedTime) {
      this.timeLeft = parseInt(savedTime, 10);
    }

    // Start the timer only if it's not already started
    if (!this.interval) {
      this.startTimer();
    }
  }

  ngOnDestroy(): void {
    // Clear the interval when the component is destroyed
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  register(): void {
    this.router.navigate(['/save']);
  }

  home(): void {
    this.router.navigate(['/home']);
  }

  startTimer(): void {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        // Store the current timeLeft in localStorage
        localStorage.setItem('timeLeft', this.timeLeft.toString());
      } else {
        clearInterval(this.interval);
      }
    }, 1000); // Update every second
  }

  Order(): void {
    this.router.navigate(['/orderForm']);
  }

  logout(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to logout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Logout!',
      cancelButtonText: 'No, Cancel',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
        localStorage.removeItem('timeLeft'); // Remove the saved timeLeft on logout

        this.toastr.info('You have logged out successfully!');
        this.router.navigate(['']);
      }
    });
  }
}
