import { HTTP_INTERCEPTORS, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { TokenStorageService } from '../_services/token-storage.service';
import { Observable } from 'rxjs';

 const TOKEN_HEADER_KEY = 'Authorization';       // for Spring Boot back-end
//const TOKEN_HEADER_KEY = 'x-access-token';   // for Node.js Express back-end

@Injectable()
export class AuthInterceptor {
  constructor(private token: TokenStorageService) { }

  public httpOptionsAuth(){ 
    const token = 'Bearer '+  this.token.getToken();
    var ReqHeaders = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization' : token != null ? token : ''  });

  
    return ReqHeaders;
  }
  

}

