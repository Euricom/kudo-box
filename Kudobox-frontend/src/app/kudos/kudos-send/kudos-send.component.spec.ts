import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KudosSendComponent } from './kudos-send.component';

describe('KudosSendComponent', () => {
    let component: KudosSendComponent;
    let fixture: ComponentFixture<KudosSendComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [KudosSendComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(KudosSendComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
