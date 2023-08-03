import { TestBed } from '@angular/core/testing';

import { LoginFormFieldsService } from './login-form-fields.service';

describe('LoginFormFieldsService', () => {
  let service: LoginFormFieldsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginFormFieldsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
