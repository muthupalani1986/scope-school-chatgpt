import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'workflow-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  constructor(private _formBuilder:FormBuilder) {}
  ngOnInit(): void {
    this.resetPasswordForm = this._formBuilder.group({
      email:['',[Validators.required,Validators.email]]
    });
  }
  onSubmit(){
    if(this.resetPasswordForm.valid){
      console.log("Password reset form");
    }
  }
  get email() {
    return this.resetPasswordForm.get('email');
  }
  get emailErrorMessage() {
    if (this.email?.hasError('required')) {
      return 'Please enter email';
    }
    if (this.email?.hasError('email')) {
      return 'Please enter valid email';
    }
    return '';
  }
}
