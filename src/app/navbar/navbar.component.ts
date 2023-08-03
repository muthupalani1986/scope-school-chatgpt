import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/services/auth/auth.service';
import { SessionStorageService } from '../shared/services/storage/session-storage.service';
import { Router } from '@angular/router';
import { LoginResponse } from '../login/interfaces/login';
import { SESSION_STORAGE } from '../shared/constants/session-storage.constant';

@Component({
  selector: 'workflow-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  public toggleNavbar: boolean = false;
  public isLoggedIn: boolean = false;
  public subscriptions: Subscription[] = [];
  public useredtails: LoginResponse = {};
  constructor(private _authService: AuthService,
    private _sessionStorageService: SessionStorageService,
    private _router: Router) { }
  ngOnInit(): void {
    this.subscriptions.push(this._authService.getLoggedIn().subscribe((res) => {
      this.isLoggedIn = this._authService.loggedIn();
      this.useredtails = this._sessionStorageService.getItem(SESSION_STORAGE.userDetails);
    }));
  }
  public toggle() {
    this.toggleNavbar = !this.toggleNavbar;
  }
  public logout() {
    this._sessionStorageService.clear();
    this._authService.setLoggedIn(false);
    this._router.navigate(['login']);
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }
}
