import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LeadsResponse } from '../models/lead.model';

export interface LeadFilters {
    page?: number;
    limit?: number;
    marca?: string;
    nombreCliente?: string;
    fechaDesde?: string;
    fechaHasta?: string;
}

@Injectable({ providedIn: 'root' })
export class AdminService {
  private apiUrl = `${environment.apiUrl}/admin/leads`;

  constructor(private http: HttpClient) {}

  getLeads(filters: LeadFilters): Observable<LeadsResponse> {
    let params = new HttpParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        params = params.set(key, value);
      }
    });

    return this.http.get<LeadsResponse>(this.apiUrl, { params });
  }
}