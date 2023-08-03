import { FormElementBase } from "./form-element-base";

export class DropdownField extends FormElementBase<string> {
    override controlType = 'dropdown';
}
