import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicKudoComponent } from './public-kudo.component';

describe('PublicKudoComponent', () => {
  let component: PublicKudoComponent;
  let fixture: ComponentFixture<PublicKudoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicKudoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicKudoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
