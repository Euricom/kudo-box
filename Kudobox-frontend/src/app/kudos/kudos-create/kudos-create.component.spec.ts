import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KudosCreateComponent } from './kudos-create.component';

describe('KudosCreateComponent', () => {
  let component: KudosCreateComponent;
  let fixture: ComponentFixture<KudosCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KudosCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KudosCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
