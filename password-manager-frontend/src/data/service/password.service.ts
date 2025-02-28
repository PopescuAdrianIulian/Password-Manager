import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Password } from '../model/Password';
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})

export class PasswordService {
  private baseUrl = 'http://localhost:8080/password';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Password[]> {
    return this.http.get<Password[]>(this.baseUrl, { withCredentials: true });
  }

  getById(id: number): Observable<Password> {
    return this.http.get<Password>(`${this.baseUrl}/${id}`, { withCredentials: true });
  }

  addPassword(password: FormGroup): Observable<Password> {
    return this.http.post<Password>(this.baseUrl, password, { withCredentials: true });
  }

  updatePassword(id: number, password: Password): Observable<Password> {
    return this.http.post<Password>(`${this.baseUrl}/${id}`, password, { withCredentials: true });
  }

  deletePassword(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { withCredentials: true });
  }
}
