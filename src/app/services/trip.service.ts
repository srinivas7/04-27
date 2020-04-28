import { Injectable, Optional, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(@Optional()
  config: any,
  private httpClient: HttpClient) { }
}
