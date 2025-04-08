import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthStatusService } from "../data-access/auth.status.service";

export const privateGuard = (): CanActivateFn => {
  return () => {
    const authState = inject(AuthStatusService);
    const router = inject(Router);
    const session = authState.getSession();

    if(session) {
      return true;
    }

    router.navigateByUrl('/login')

    return false;
  };
}

export const publicGuard = (): CanActivateFn => {
  return () => {
    const authState = inject(AuthStatusService);
    const router = inject(Router);
    const session = authState.getSession();

    if(session) {
      router.navigateByUrl('/dashboard')
      return false;
    }

    return true;
  };
}
