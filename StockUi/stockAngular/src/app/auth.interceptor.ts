import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './login/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
  constructor(private authService: AuthService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const {username, password } = this.authService.getCredentials();
    if(username && password){
      const authHeader = 'Basic ' + btoa(`${username}:${password}`);

    const authReq = req.clone({
      setHeaders: {
        Authorization: authHeader,
      },
    });

      return next.handle(authReq);
    }

    return next.handle(req);
  }
}
