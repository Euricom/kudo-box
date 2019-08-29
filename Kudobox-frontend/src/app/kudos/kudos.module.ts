import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCarouselModule } from '@ngmodule/material-carousel';

import { MatCardModule } from '@angular/material';
import { KudosRoutingModule } from './kudos-routing.module';
import { KudosComponent } from './kudos.component';
import { KudosListComponent } from './kudos-selection-list/kudos-list.component';
import { KudosCarouselComponent } from './kudos-carousel/kudos-carousel.component';
import { KudosCreateComponent } from './kudos-create/kudos-create.component';
import { KudosSendComponent } from './kudos-send/kudos-send.component';

@NgModule({
    declarations: [
        KudosComponent,
        KudosListComponent,
        KudosCarouselComponent,
        KudosCreateComponent,
        KudosSendComponent,
    ],
    imports: [CommonModule, KudosRoutingModule, MatCardModule, MatCarouselModule],
})
export class KudosModule {}
