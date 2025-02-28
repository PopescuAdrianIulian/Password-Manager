import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/auth';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private usernameSubject = new BehaviorSubject<string | null>(null);
  private userIdSubject = new BehaviorSubject<number | null>(null);

  constructor(private http: HttpClient) {
    this.checkAuthStatus();
  }

  get isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, { username, password });
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { username, password }, { withCredentials: true })
      .pipe(
        tap((response: any) => {
          this.isAuthenticatedSubject.next(true);
          this.usernameSubject.next(response.username);
          this.userIdSubject.next(response.userId);
        })
      );
  }

  checkAuthStatus(): void {
    this.http.get(`${this.baseUrl}/check-session`, { withCredentials: true })
      .subscribe({
        next: (response: any) => {
          if (response.authenticated) {
            this.isAuthenticatedSubject.next(true);
            this.usernameSubject.next(response.username);
            this.userIdSubject.next(response.userId);
          } else {
            this.isAuthenticatedSubject.next(false);
            this.usernameSubject.next(null);
            this.userIdSubject.next(null);
          }
        },
        error: () => {
          this.isAuthenticatedSubject.next(false);
          this.usernameSubject.next(null);
          this.userIdSubject.next(null);
        }
      });
  }
}
