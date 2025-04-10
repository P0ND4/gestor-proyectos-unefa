import { inject, Injectable } from "@angular/core";
import { StorageService } from "./storage.service";

interface Session {
  accessToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthStatusService {
  private _storageService = inject(StorageService);

  sigOut(){
    this._storageService.remove('session');
  }

  getSession(): Session | null {
    let currentSession: Session | null = null;
    const maybeSeccion = this._storageService.get<Session>('session');
    if (maybeSeccion !== null) {
      if (this._isValidSession(maybeSeccion)) {
        currentSession = maybeSeccion;
      } else {
        this.sigOut();
      }
    }
    return currentSession;
  }

  private _isValidSession(maybeSeccion: unknown): boolean {
    return (
      typeof maybeSeccion === 'object' &&
      maybeSeccion !== null &&
      'accessToken' in maybeSeccion
    );
  }
}
