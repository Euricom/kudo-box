import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { KudoService } from '../services/kudo.service';
import { AuthService } from '../services/auth.service';

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
        this.kudoService.makeAdmin(form.value);
    }
    addUser(form: FormGroup) {
        const email = form.controls.email.value;
        const name = form.controls.name.value;
        const admin = form.controls.admin.value;
        this.kudoService.addUser({
            body: form.value,
            currentUser: this.authService.user,
        });
    }

    deleteAllKudos() {
        this.kudoService.deleteAllKudos();
    }
}
