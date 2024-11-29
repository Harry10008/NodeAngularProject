import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3001/'; 

  constructor(
    private http:HttpClient
  ) { }

  getData(url:any): Observable<any> {
    return this.http.get(`${this.apiUrl}${url}`); 
  }

  
  createData(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/posts`, data);
  }

}
