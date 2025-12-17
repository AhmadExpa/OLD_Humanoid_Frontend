import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment'; // Add this if using env vars

@Injectable({
  providedIn: 'root',
})
export class PayeSlipsService {
  private baseUrl = `${environment.base_url}/payEMangement`; // adjust if not using env

  constructor(private HttpClient: HttpClient) {}

  // Create pay slip
  createPaySlip(payload: any) {
    return this.HttpClient.post(`${this.baseUrl}/createPaySlip`, payload);
  }

  // Get all pay slips
  fetchAllPaySlips() {
    return this.HttpClient.get(`${this.baseUrl}/fetchAllPayESlip`);
  }

  // Get single pay slip by ID
  fetchPaySlipById(id: string) {
    return this.HttpClient.get(`${this.baseUrl}/fetchPaySlipById/${id}`);
  }

  // Delete single pay slip by ID
  deletePaySlipById(id: string) {
    return this.HttpClient.delete(`${this.baseUrl}/deletePaySlipById/${id}`);
  }
}
