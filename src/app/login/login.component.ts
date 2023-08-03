import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './services/login.service';
import { LoginPayload, LoginResponse } from './interfaces/login';
import { SessionStorageService } from '../shared/services/storage/session-storage.service';
import { SESSION_STORAGE } from '../shared/constants/session-storage.constant';
import { AuthService } from '../shared/services/auth/auth.service';
import { Subscription } from 'rxjs';
import { ToastService } from '../shared/services/toast/toast.service';

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
  constructor(private _router: Router,
    private _loginService: LoginService,
    private _sessionStorageService: SessionStorageService,
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _toastService: ToastService) { }
  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
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
  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }
}
