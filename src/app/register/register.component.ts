import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { US_STATES } from '../shared/constants/us-states.constant';

@Component({
  selector: 'workflow-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  states = US_STATES;
  payLoad = '';
  constructor(private _formBuilder: FormBuilder) {

  }
  ngOnInit() {
    this.registerForm = this._formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      state: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      privacy:[false,[Validators.required]]
    })
  }
  get firstName() {
    return this.registerForm.get('firstName');
  }
  get lastName() {
    return this.registerForm.get('lastName');
  }
  get state() {
    return this.registerForm.get('state');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get privacy(){
    return this.registerForm.get('privacy');
  }
  get firstNameErrorMessage() {
    if (this.firstName?.hasError('required')) {
      return 'First name is required';
    }
    return '';
  }
  get lastNameErrorMessage() {
    if (this.lastName?.hasError('required')) {
      return 'Last name is required';
    }
    return '';
  }
  get stateErrorMessage() {
    if (this.state?.hasError('required')) {
      return 'State is required';
    }
    return '';
  }
  get emailErrorMessage() {
    if (this.email?.hasError('required')) {
      return 'Email is required';
    }
    if (this.email?.hasError('email')) {
      return 'Not a valid email';
    }
    return ''
  }
  get passwordErrorMessage() {
    if (this.password?.hasError('required')) {
      return 'Password is required';
    }
    if (this.password?.hasError('minlength')) {
      return 'Enter At least 8 characters';
    }
    return ''
  }
  get privacyErrorMessage(){
    if (this.privacy?.hasError('required')) {
      return 'You must agree to the consents';
    }
    return '';
  }
  public onSubmit() {
    if (this.registerForm.valid) {
      this.payLoad = this.registerForm.getRawValue();
      console.log("this.payLoad ", this.payLoad);
    }
  }
}
