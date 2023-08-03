import { Injectable, TemplateRef } from '@angular/core';
import { ToastInfo } from './toast.interface';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: any[] = [];

  constructor() { }

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    if (options['type'] && options['type'] === 'danger') {
      options = { ...options, classname: 'bg-danger text-light' };
    }
    else if (options['type'] && options['type'] === 'success') {
      options = { ...options, classname: 'bg-success text-light' };
    }
    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }

}
