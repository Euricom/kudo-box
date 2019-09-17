import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Kudo } from '../core/models/kudo';

@Injectable()
export class WallOfFameService {
    constructor(private socket: Socket) {}

    updateWallOfFameWithLatestFromEvent(): Observable<Kudo[]> {
        return this.socket.fromEvent<Kudo[]>('newWallOfFameKudo').pipe(map(data => data));
    }
}
