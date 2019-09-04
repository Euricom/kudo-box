import { Injectable, ErrorHandler } from '@angular/core';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {

  constructor(private _notifier: NotifierService) { }

  handleError(error: any) {
    this._notifier.notify('error', error);
  }
}
