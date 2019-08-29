import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KudosComponent } from './kudos.component';

describe('KudosComponent', () => {
    let component: KudosComponent;
    let fixture: ComponentFixture<KudosComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [KudosComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(KudosComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
