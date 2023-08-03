import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SessionStorageService } from '../storage/session-storage.service';
import { SESSION_STORAGE } from '../../constants/session-storage.constant';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  constructor(private _sessionStorageService:SessionStorageService) { }
  public setLoggedIn(flag: boolean) {
    this.isLoggedIn.next(flag);
  }
  public getLoggedIn(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }
  public loggedIn():boolean{
    return !!this._sessionStorageService.getItem(SESSION_STORAGE.userDetails);
  }
}
