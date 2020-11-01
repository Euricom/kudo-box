/* eslint-disable max-classes-per-file */
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'admin-dialog',
    template: `
        <h1 mat-dialog-title>Delete Kudos</h1>
        <div mat-dialog-content>
            <p>Are you sure you want to remove all kudos</p>
        </div>
        <div mat-dialog-actions>
            <button mat-button (click)="onNoClick()">No Thanks</button>
            <button mat-button cdkFocusInitial (click)="onYesClick()">Ok</button>
        </div>
    `,
})
export class AdminDialogComponent {
    constructor(public dialogRef: MatDialogRef<AdminDialogComponent>) {}

    onNoClick(): void {
        this.dialogRef.close(false);
    }
    onYesClick(): void {
        this.dialogRef.close(true);
    }
}
