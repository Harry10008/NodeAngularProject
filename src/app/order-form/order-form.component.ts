import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  orderform!: FormGroup;
  data: any = [];
  error: string = '';
  orderData: any =[]

  ngOnInit(): void {
    this.fetchOrder()
    this.fetchData();
    this.orderform = this.fb.group({
      user_id:['',Validators.required],
      order_name:['',Validators.required],
      quantity: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(2)]],
    });
  }
  
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private http:HttpClient
  ) {}
  
  async onsubmit(): Promise<void> {
    const orderData=this.orderform.value
    // console.log(this.orderform.value.order_name);
    await this.http.post<any>("http://localhost:3001/admin/saveOrderDetail", orderData).toPromise();
    this.toastr.success('Order added successfully!');
    this.orderform.reset();
    this.fetchOrder();
  }
  fetchData() {
    this.http.get<any>('http://localhost:3001/user/fetch').subscribe(
      (response) => {
        this.data = response.users;
        //console.log(this.data);
      },
      (error) => {
        this.error = 'An error occurred while fetching data.'; 
      }
    );
  };
  fetchOrder(){
    this.http.get<any>('http://localhost:3001/admin/orderDetails').subscribe(
      (response) => {
        this.orderData = response.details; 
        console.log(this.orderData);
      },
      (error) => {
        this.error = 'An error occurred while fetching data.'; 
      }
    );
  };

  deleteOrder(id: any): void {
    console.log(id)
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you really want to delete this Order...?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel',
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.http.delete('http://localhost:3001/admin/deleteOrder?id=' + id).subscribe(
              (response) => {
                this.fetchData();
              },
              (error) => {
                this.error = 'An error occurred while fetching data.';
              }
            );
          this.toastr.success('order deleted sucessfully');
          this.fetchData();
          this.fetchOrder();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  logout(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to logout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes,Logout!',
      cancelButtonText: 'No, Cancel',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('user');
        this.toastr.success('You have logged out successfully!');
        this.router.navigate(['']);
      }
    });
  };

  register(): void {
    this.router.navigate(['/save']);
  };

  home(): void {
    this.router.navigate(['/home']);
  };
};