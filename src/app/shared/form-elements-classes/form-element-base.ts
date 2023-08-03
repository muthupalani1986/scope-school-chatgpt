export class FormElementBase<T> {
    value: T | undefined;
    key: string;
    label: string;
    order: number;
    controlType: string;
    type: string;
    options: { key: string; value: string }[];
    validators: string[];
    directives: string[];
    constructor(
        options: {
            value?: T;
            key?: string;
            label?: string;
            required?: boolean;
            order?: number;
            controlType?: string;
            type?: string;
            options?: { key: string; value: string }[];
            validators?: string[];
            directives?: string[];
        } = {}
    ) {
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || '';
        this.type = options.type || '';
        this.options = options.options || [];
        this.validators = options.validators || [];
        this.directives = options.directives || [];
    }
}
