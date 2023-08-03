import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { FormElementBase } from 'src/app/shared/form-elements-classes/form-element-base';
import { TextboxField } from 'src/app/shared/form-elements-classes/textbox-field';

@Injectable({
  providedIn: 'root'
})
export class RegisterFormFieldsService {

  constructor() { }
  getFields() {
    const questions: FormElementBase<string>[] = [
      new TextboxField({
        key: 'firstName',
        label: 'First name',
        value: '',
        validators: ['required'],
        order: 1,
      }),
      new TextboxField({
        key: 'lastName',
        label: 'Last Name',
        value: '',
        validators: ['required'],
        order: 2,
      })
    ];
    return of(questions.sort((a, b) => a.order - b.order));
  }
}
