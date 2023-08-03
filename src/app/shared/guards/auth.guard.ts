import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionStorageService } from '../services/storage/session-storage.service';
import { SESSION_STORAGE } from '../constants/session-storage.constant';

export const authGuard: CanActivateFn = (route, state) => {
  const _sessionStorageService = inject(SessionStorageService);
  const _router: Router = inject(Router);
  if (!_sessionStorageService.getItem(SESSION_STORAGE.userDetails)) {
    _router.navigate(['login']);
    return false;
  }
  return true;
};
