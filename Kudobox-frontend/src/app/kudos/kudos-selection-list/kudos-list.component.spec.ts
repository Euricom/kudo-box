import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KudosListComponent } from './kudos-list.component';

describe('KudosListComponent', () => {
  let component: KudosListComponent;
  let fixture: ComponentFixture<KudosListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KudosListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KudosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
