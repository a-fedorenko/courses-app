import { DOCUMENT } from '@angular/common';
import { inject, Inject, Injectable, InjectionToken } from '@angular/core';

export const WINDOW = new InjectionToken<Window>(
  'Window',
  {
    factory: () => {
      const {defaultView} = inject(DOCUMENT);
      if (!defaultView) {
        throw new Error('Window is not available');
      }
      return defaultView;
    },
  },
);

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor(@Inject(WINDOW) private window: Window) { }

  setToken(token: string): void {
    this.window.sessionStorage.setItem('token', token);
  }

  getToken() {
    return this.window.sessionStorage.getItem('token');
  }

  deleteToken(): void {
    this.setToken('');
    this.window.sessionStorage.clear();
  }
}
