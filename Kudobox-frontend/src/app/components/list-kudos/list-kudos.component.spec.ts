import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListKudosComponent } from './list-kudos.component';

describe('ListKudosComponent', () => {
  let component: ListKudosComponent;
  let fixture: ComponentFixture<ListKudosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListKudosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListKudosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
