import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material';
import { PublicKudoRoutingModule } from './public-kudo-routing.module';
import { PublicKudoComponent } from './public-kudo.component';

@NgModule({
    declarations: [PublicKudoComponent],
    imports: [CommonModule, MatCardModule, PublicKudoRoutingModule],
})
export class PublicKudoModule {}
