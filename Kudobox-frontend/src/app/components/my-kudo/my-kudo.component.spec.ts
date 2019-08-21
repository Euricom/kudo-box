import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyKudoComponent } from './my-kudo.component';

describe('MyKudoComponent', () => {
  let component: MyKudoComponent;
  let fixture: ComponentFixture<MyKudoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyKudoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyKudoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
