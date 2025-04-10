import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, pipe, tap } from "rxjs";
import { environment } from "../../environments/environment";
import { StorageService } from "../shared/data-access/storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _http = inject(HttpClient);
  private _storage = inject(StorageService);

  constructor() {}

  login(login: String, password: String):Observable<any> {
    return this._http
      .post(`${environment.API_URL}/auth/login`,{
        login,
        password,
      })
      .pipe(
        tap((Response) => {
          this._storage.set('session', JSON.stringify(Response));
        })
      );
  }

  record(login: String, password: String):Observable<any> {
    return this._http
      .post(`${environment.API_URL}/auth/record`,{
        login,
        password,
      })
      .pipe(
        tap((Response) => {
          this._storage.set('session', JSON.stringify(Response));
        })
      );
  }
}
