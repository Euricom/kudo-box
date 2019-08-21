import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewKudoComponent } from './newKudo.component';

describe('NewKudoComponent', () => {
  let component: NewKudoComponent;
  let fixture: ComponentFixture<NewKudoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewKudoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewKudoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
