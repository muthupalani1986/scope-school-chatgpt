import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormElementBase } from '../../form-elements-classes/form-element-base';

@Injectable({
  providedIn: 'root'
})
export class FormControlService {

  constructor() { }

  toFormGroup(formElements: FormElementBase<string>[]) {
    const group: any = {};
    formElements.forEach((elemt) => {
      let validators = [];
      if (elemt.validators.includes('required')) {
        validators.push(Validators.required);
      }
      if (elemt.validators.includes('minLength')) {
        validators.push(Validators.minLength(8));
      }
      group[elemt.key] = new FormControl(elemt.value || '', [...validators]);
    });
    return new FormGroup(group);
  }
}
