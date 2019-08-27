import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllKudosComponent } from './all-kudos.component';

describe('AllKudosComponent', () => {
  let component: AllKudosComponent;
  let fixture: ComponentFixture<AllKudosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllKudosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllKudosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
