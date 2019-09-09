import { Injectable, ErrorHandler } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import * as Logger from 'js-logger';

@Injectable({
    providedIn: 'root',
})
export class ErrorHandlerService implements ErrorHandler {
    private log = Logger.get('ErrorHandlerService');

    constructor(private _notifier: NotifierService) {}

    handleError(error: any) {
        this.log.info('Error:', error);
        this._notifier.notify('error', error);
    }
}
