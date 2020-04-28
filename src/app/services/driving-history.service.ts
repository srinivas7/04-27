import { Injectable, Optional, Inject } from '@angular/core';
import { CustomerComponent } from '../customer/customer.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerService } from './customer.service';

@Injectable({
  providedIn: 'root'
})
export class DrivingHistoryService {
  commonService: any;
  endPoints: any;

  constructor(@Optional()
  config: any,
    private httpClient: HttpClient,
    private customer: CustomerService) { }


}
