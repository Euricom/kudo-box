import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KudosCarouselComponent } from './kudos-carousel.component';

describe('KudosCarouselComponent', () => {
    let component: KudosCarouselComponent;
    let fixture: ComponentFixture<KudosCarouselComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [KudosCarouselComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(KudosCarouselComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
