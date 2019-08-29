import { Injectable, ErrorHandler } from '@angular/core';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {

  constructor(private _notifier: NotifierService) { }

  handleError(error: any) {
    console.log('ERROR', error)
    this._notifier.notify('error', "Something went wrong!");
  }
}
