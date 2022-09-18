import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { employee } from 'src/app/Models/employee';
import { AuthInterceptor } from '../_helpers/auth.interceptor';
import { TokenStorageService } from './token-storage.service';

const API_URL = 'http://localhost:5291/api/Employees';


var httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  isLoggedIn = false;
  constructor(private http: HttpClient,private authInterceptor :AuthInterceptor,private token: TokenStorageService) { 
    httpOptions.headers = this.authInterceptor.httpOptionsAuth();
    this.isLoggedIn = !!this.token.getToken();
    if(!this.isLoggedIn){
      window.location.replace('/login')
    }
  }

  getEmployees(): Observable<any> {
    return this.http.get(API_URL,httpOptions);
  }

  getEmployee(empId :string): Observable<any> {
    return this.http.get(API_URL+'/'+empId , httpOptions);
  }

  addEmployee(emp :employee): Observable<any> {
    return this.http.post(API_URL,emp ,httpOptions);
  }

  editEmployee(emp :employee): Observable<any> {
    return this.http.put(API_URL,emp ,httpOptions);
  }

  deleteEmployee(empId :string): Observable<any> {
    return this.http.delete(API_URL+'/'+empId ,httpOptions);
  }

  /*
  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  */
}
