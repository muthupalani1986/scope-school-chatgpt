import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './services/login.service';
import { LoginPayload, LoginResponse } from './interfaces/login';
import { SessionStorageService } from '../shared/services/storage/session-storage.service';
import { SESSION_STORAGE } from '../shared/constants/session-storage.constant';
import { AuthService } from '../shared/services/auth/auth.service';
import { Subscription, count } from 'rxjs';
import { ToastService } from '../shared/services/toast/toast.service';
import { LocalStorageService } from '../shared/services/storage/local-storage.service';

@Component({
  selector: 'workflow-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  payLoad!: LoginPayload;
  subscriptions: Subscription[] = [];
  loginForm!: FormGroup;
  hide = true;
  noOfTimes:number=0;
  constructor(private _router: Router,
    private _loginService: LoginService,
    private _sessionStorageService: SessionStorageService,
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _toastService: ToastService,
    private _localStorageService: LocalStorageService) { }
  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
    if (this._localStorageService.getItem('no_of_times_clicked')) {
      const data = this._localStorageService.getItem('no_of_times_clicked');
      this.noOfTimes = parseInt(data.count);
    }
  }
  public onSubmit() {
    if (this.loginForm.valid) {
      this.payLoad = this.loginForm.getRawValue();
      this.subscriptions.push(this._loginService.login(this.payLoad).subscribe((res: LoginResponse) => {
        this._sessionStorageService.setItem(SESSION_STORAGE.userDetails, res);
        this._authService.setLoggedIn(true);
        this._router.navigate(['home']);
      }, (error) => {
        this._toastService.show(error, { type: 'danger' });
      }));
    }
  }
  public createAccount(): void {
    this._router.navigate(['register']);
  }
  public get emailErrorMessage() {
    if (this.email?.hasError('required')) {
      return 'Please enter email';
    }
    if (this.email?.hasError('email')) {
      return 'Please enter valid email';
    }
    return '';
  }
  get passwordErrorMessage() {
    if (this.password?.hasError('required')) {
      return 'Please enter password';
    }
    return '';
  }
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('email');
  }
  checkStorage() {
    let value = { "count": 1 };
    if (this._localStorageService.getItem('no_of_times_clicked')) {
      const data = this._localStorageService.getItem('no_of_times_clicked');
      const count = parseInt(data.count) + 1;
      value = { count }
    }
    console.log("value",value);
    this.noOfTimes = value.count;
    this._localStorageService.setItem("no_of_times_clicked", value);
  }
  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }
}
