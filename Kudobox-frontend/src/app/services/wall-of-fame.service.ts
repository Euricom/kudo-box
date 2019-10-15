import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as Logger from 'js-logger';
import { Kudo } from '../models/kudo';

@Injectable()
export class WallOfFameService {
    constructor(private socket: Socket) {}

    updateWallOfFameWithLatestFromEvent(): Observable<Kudo[]> {
        return this.socket.fromEvent<Kudo[]>('newWallOfFameKudo').pipe(
            map(data => {
                Logger.info('kudos:', data);
                return data;
            }),
        );
    }
}
