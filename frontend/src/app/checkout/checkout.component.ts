import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { OrdersService } from '../core/services/orders.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(
    private router: Router,
    private ordersService: OrdersService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if(form.invalid) {
      return;
    }
    this.ordersService.save(form.value.contactName, form.value.city, form.value.address, form.value.phone).subscribe(
      response => {
        this.router.navigate(['./orders']);
      },
      error => {
        console.log(error);
      }
    );
  }

}
