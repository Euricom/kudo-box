import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { KudoService } from '../services/kudo.service';
import { AuthService } from '../services/auth.service';
import { AdminDialogComponent } from './admin-dialog.component';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
    public baseLocation = window.location.origin;
    public publicKudoUrl;
    public kudoId;
    public baseImageLocation;
    public addUserForm;
    public makeAdminForm;
    constructor(
        private meta: Meta,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private kudoService: KudoService,
        private authService: AuthService,
        public dialog: MatDialog,
        private _notifier: NotifierService,
    ) {
        this.addUserForm = this.formBuilder.group({
            name: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email]),
            admin: new FormControl(false, [Validators.required]),
        });
        this.makeAdminForm = this.formBuilder.group({
            email: new FormControl('', [Validators.required, Validators.email]),
        });
    }
    ngOnInit() {}

    makeAdmin(form: FormGroup) {
        const email = form.controls.email;
        this.kudoService
            .makeAdmin(form.value)
            .pipe()
            .subscribe(
                () => {
                    this._notifier.notify('success', 'User addminified');
                    form.reset();
                },
                err => {
                    throw err;
                },
            );
    }
    addUser(form: FormGroup) {
        const email = form.controls.email.value;
        const name = form.controls.name.value;
        const admin = form.controls.admin.value;
        this.kudoService
            .addUser({
                body: form.value,
                currentUser: this.authService.user,
            })
            .pipe()
            .subscribe(
                () => {
                    this._notifier.notify('success', 'User added');
                    form.reset();
                },
                err => {
                    throw err;
                },
            );
    }

    deleteAllKudos() {
        this.kudoService
            .deleteAllKudos()
            .pipe()
            .subscribe(
                () => {
                    this._notifier.notify('success', 'All kudos deleted');
                },
                err => {
                    throw err;
                },
            );
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(AdminDialogComponent, {
            width: '250px',
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            if (result) {
                this.deleteAllKudos();
            }
        });
    }
}
