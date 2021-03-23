import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toast: ToastrService) { }

  showSuccess(message, title){
    this.toast.success(message, title)
  }

  showError(message, title){
      this.toast.error(message, title)
  }

  showInfo(message, title){
      this.toast.info(message, title)
  }

  showWarning(message, title){
      this.toast.warning(message, title)
  }
}
