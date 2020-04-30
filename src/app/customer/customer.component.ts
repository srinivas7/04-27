import { Component, OnInit } from '@angular/core';
import { Customer } from './customer';
import { AppService } from '../services/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  public customer: Customer = <Customer>{};
  public customerList: Customer[];
  public customerListCopy: Customer[];
  constructor(private apiService: AppService,private router:Router) { }
  ngOnInit(): void {
    this.getCustomers();
  }
  private getCustomers() {
    this.apiService.getJson('assets/customerNew.json').subscribe(data => {
      let result = data as any;
      this.customerList = result.CustDeviceList as Customer[];
      this.customerListCopy = this.customerList;
    })
  }
  public customerSearch() {
    if (this.customer.firstname || this.customer.lastname || this.customer.email || this.customer.imei) {
      this.customerList = this.customerList.filter(val => val.firstname === this.customer.firstname || val.lastname === this.customer.lastname || val.email === this.customer.email || val.imei === this.customer.imei);
    } else {
      this.customerList = this.customerListCopy;
    }
  }
  public navigateToTrip(customer:Customer){
    this.apiService.setStorage(customer);
    this.router.navigate(['/trips',customer['userId']]);
  }
}
