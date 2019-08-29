import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareButtonsModule } from '@ngx-share/buttons';

import { MatCardModule } from '@angular/material';
import { MyKudosRoutingModule } from './my-kudos-routing.module';
import { MyKudosComponent } from './my-kudos.component';

@NgModule({
    declarations: [MyKudosComponent],
    imports: [CommonModule, MatCardModule, ShareButtonsModule, MyKudosRoutingModule],
})
export class MyKudosModule {}
