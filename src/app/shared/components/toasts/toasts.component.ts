import { Component, TemplateRef } from '@angular/core';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'workflow-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss']
})
export class ToastsComponent {
  constructor(public toastService:ToastService){}
  isTemplate(toast:any) {
		return toast.textOrTpl instanceof TemplateRef;
	}

}
