import { TestBed } from '@angular/core/testing';

import { RegisterFormFieldsService } from './register-form-fields.service';

describe('RegisterFormFieldsService', () => {
  let service: RegisterFormFieldsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterFormFieldsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
