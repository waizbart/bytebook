import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3333';

  constructor(private http: HttpClient) { }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  register(user: { name: string, email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, user);
  }
}
