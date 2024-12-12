import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './login/auth.service';
import { inject } from '@angular/core'

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const { username, password } = authService.getCredentials();
  if (username && password) {
    const authHeader = 'Basic ' + btoa(`${username}:${password}`);

    const authReq = req.clone({
      setHeaders: {
        Authorization: authHeader,
      },
    });

    return next(authReq);
  }

  return next(req);
};
