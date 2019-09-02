import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { MatCardModule, MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { WallOffFameRoutingModule } from './wall-off-fame-routing.module';
import { WallOffFameComponent } from './wall-off-fame.component';

@NgModule({
    declarations: [WallOffFameComponent],
    imports: [CommonModule, FormsModule, Ng2SearchPipeModule, WallOffFameRoutingModule, MatInputModule, MatCardModule],
})
export class WallOffFameModule {}