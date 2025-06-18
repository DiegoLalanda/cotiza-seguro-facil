import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CreateLeadDto } from '../models/lead.model';

@Injectable({ providedIn: 'root' })
export class LeadsService {
  private apiUrl = `${environment.apiUrl}/leads`;

  constructor(private http: HttpClient) {}

  createLead(leadData: CreateLeadDto): Observable<{ message: string; clienteId: number }> {
    return this.http.post<{ message: string; clienteId: number }>(this.apiUrl, leadData);
  }
}