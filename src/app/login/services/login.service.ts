import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { LoginPayload, LoginResponse } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiURL = 'http://localhost:3000';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) { }
  login(payload: LoginPayload): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(this.apiURL + '/login', payload)
      .pipe(retry(0), catchError(this.handleError));
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => {
      return errorMessage;
    });
  }


}
