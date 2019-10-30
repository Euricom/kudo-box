import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareButtonsModule } from '@ngx-share/buttons';

import { MatCardModule } from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MyKudosRoutingModule } from './my-kudos-routing.module';
import { MyKudosComponent } from './my-kudos.component';

@NgModule({
    declarations: [MyKudosComponent],
    imports: [CommonModule, MatCardModule, ShareButtonsModule, MyKudosRoutingModule, MatProgressSpinnerModule],
})
export class MyKudosModule {}
