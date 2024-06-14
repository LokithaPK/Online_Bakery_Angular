import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  private apiUrl = 'http://localhost:3000/api'; 

  constructor(private http: HttpClient) { }

  saveCalculation(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/save-calculation`, data);
  }

  saveBill(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/save-bill`, data);
  }
}
