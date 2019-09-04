import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyKudosComponent } from './my-kudos.component';

describe('MyKudosComponent', () => {
  let component: MyKudosComponent;
  let fixture: ComponentFixture<MyKudosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyKudosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyKudosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
