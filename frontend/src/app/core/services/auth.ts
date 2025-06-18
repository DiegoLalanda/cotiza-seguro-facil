import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginResponse } from '../models/auth.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.apiUrl}/admin/auth`;
  private readonly TOKEN_KEY = 'authToken';
  
  // --- CAMBIO 1: Declara la señal sin inicializarla aquí ---
  public isAuthenticated = signal<boolean>(false);

  constructor(
    private http: HttpClient, 
    private router: Router, 
    private cookieService: CookieService
  ) {
    // --- CAMBIO 2: Inicializa la señal DENTRO del constructor ---
    // En este punto, this.cookieService ya ha sido inyectado y existe.
    this.isAuthenticated.set(this.cookieService.check(this.TOKEN_KEY));
  }

  login(credentials: { username: string, password: string }): Observable<LoginResponse | null> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        this.saveToken(response.access_token);
        this.isAuthenticated.set(true);
      }),
      catchError(() => {
        this.isAuthenticated.set(false);
        return of(null);
      })
    );
  }

  logout(): void {
    this.cookieService.delete(this.TOKEN_KEY, '/');
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    // Usamos .get() que devuelve una cadena vacía si no la encuentra, por eso el || null.
    const token = this.cookieService.get(this.TOKEN_KEY);
    return token ? token : null;
  }

  private saveToken(token: string): void {
    const expires = new Date();
    expires.setDate(expires.getDate() + 7); // La cookie expira en 7 días
    
    this.cookieService.set(this.TOKEN_KEY, token, { 
      expires: expires,
      path: '/', 
      sameSite: 'Strict' 
    });
  }
}