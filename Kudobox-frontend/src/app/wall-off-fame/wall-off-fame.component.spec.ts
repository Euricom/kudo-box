import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WallOffFameComponent } from './wall-off-fame.component';

describe('WallOffFameComponent', () => {
    let component: WallOffFameComponent;
    let fixture: ComponentFixture<WallOffFameComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [WallOffFameComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WallOffFameComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
