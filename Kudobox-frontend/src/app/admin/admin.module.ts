import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule, MatButtonModule, MatIconModule, MatInputModule, MatCheckboxModule } from '@angular/material';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';

@NgModule({
    declarations: [AdminComponent],
    imports: [
        CommonModule,
        MatCardModule,
        AdminRoutingModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatCheckboxModule,
        FormsModule,
        ReactiveFormsModule,
    ],
})
export class AdminModule {}
