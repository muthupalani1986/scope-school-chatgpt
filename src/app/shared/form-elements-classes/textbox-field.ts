import { FormElementBase } from "./form-element-base";

export class TextboxField extends FormElementBase<string> {
    override controlType = 'textbox';
}
