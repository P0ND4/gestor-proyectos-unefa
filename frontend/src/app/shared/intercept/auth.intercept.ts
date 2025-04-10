import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthStatusService } from "../data-access/auth.status.service";
import { catchError, throwError } from "rxjs";
import { Router } from "@angular/router";


export const authInterceptor: HttpInterceptorFn = (
  request: HttpRequest<any>,
  next: HttpHandlerFn,
) => {
  const authStatus = inject(AuthStatusService);
  const router = inject(Router);
  const token = authStatus.getSession();

  if (!token) {
    return next(request);
  } else {

  }

  request = request.clone({
    setHeaders: {
    Authorization: `Bearer ${token?.accessToken}`,
    },
  });

  return next(request).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        authStatus.sigOut();
        router.navigateByUrl('/auth/login');
      }
      return throwError(() => error);
    })
  );
};

