import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Password } from '../model/Password';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  path = 'http://localhost:8080/password';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Password[]> {
    return this.http.get(this.path) as Observable<Password[]>;
  }
  addPassword(password: Password): Observable<Password> {
    return this.http.post(this.path, password) as Observable<Password>;
  }
  deletePassword(id: Number): Observable<void> {
    return this.http.delete<void>(`${this.path}/${id}`);
  }

  updatePassword(id: Number, password: Password): Observable<Password> {
    return this.http.put<Password>(`${this.path}/${id}`, password);
  }

  findById(id: Number): Observable<Password> {
    return this.http.get<Password>(`${this.path}/${id}`);
  }
}
