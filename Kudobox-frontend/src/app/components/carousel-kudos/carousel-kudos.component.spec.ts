import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselKudosComponent } from './carousel-kudos.component';

describe('CarouselKudosComponent', () => {
  let component: CarouselKudosComponent;
  let fixture: ComponentFixture<CarouselKudosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselKudosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselKudosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
