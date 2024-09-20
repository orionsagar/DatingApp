import { Injectable } from '@angular/core';
declare let alertify: any;

@Injectable({
  providedIn: 'root',
})
export class AlertifyService {
  constructor() {}

  confirm(message: string, okCallback: () => any) {
    alertify.confirm(message, function (e) {
      if (e) {
        okCallback();
      } else {
      }
    });
  }

  success(messsage: string): void {
    alertify.success(messsage);
  }

  error(messsage: string): void {
    alertify.error(messsage);
  }

  warning(messsage: string): void {
    alertify.warning(messsage);
  }

  message(messsage: string): void {
    alertify.message(messsage);
  }
}
