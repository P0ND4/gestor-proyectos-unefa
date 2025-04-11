import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this._storage = localStorage;
    } else {
      this._storage = {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {},
        clear: () => {},
        length: 0,
        key: () => null,
      } as Storage;
    }
  }

  get<T>(key: string): T | null {
    const value = this._storage.getItem(key);

    if (!value) return null;
    return JSON.parse(value) as T;
  }

  set(key: string, value: string) {
    this._storage.setItem(key, value);
  }

  remove(key: string) {
    this._storage.removeItem(key);
  }
}
