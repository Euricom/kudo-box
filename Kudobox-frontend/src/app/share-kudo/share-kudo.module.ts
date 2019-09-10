import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material';
import { ShareKudoRoutingModule } from './share-kudo-routing.module';
import { ShareKudoComponent } from './share-kudo.component';

@NgModule({
    declarations: [ShareKudoComponent],
    imports: [CommonModule, MatCardModule, ShareKudoRoutingModule],
})
export class PublicKudoModule {}
