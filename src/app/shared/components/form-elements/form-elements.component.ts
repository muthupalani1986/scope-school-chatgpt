import { Component, Input } from '@angular/core';
import { FormElementBase } from '../../form-elements-classes/form-element-base';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'workflow-form-elements',
  templateUrl: './form-elements.component.html',
  styleUrls: ['./form-elements.component.scss']
})
export class FormElementsComponent {
  @Input() field!: FormElementBase<string>;
  @Input() form!: FormGroup;
  @Input() formStatus: boolean = false;
  get isValid() { return this.form.controls[this.field.key].valid; }
  get errors() { return this.form.controls[this.field.key].errors; }
  get isDirty() { return this.form.controls[this.field.key].dirty; }
  get isTouched() { return this.form.controls[this.field.key].touched; }
  constructor() { }
}
