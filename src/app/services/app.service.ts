import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private http: HttpClient) { }
  storageData:any;

  getJson(URL: string) {
    return this.http.get(URL);
  }

  post(URL: string,payload: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json; charset=UTF-8',
        //'User-Agent': 'PostmanRuntime/7.19.0'
        //'Authorization': 'my-auth-token',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS'
      })}
      return this.http.post(URL,payload, httpOptions);
  }

  getStorage(){
    return this.storageData;
  }
  setStorage(data:any){
    this.storageData = data;
    sessionStorage.setItem('info', JSON.stringify(this.storageData));
  }
}
