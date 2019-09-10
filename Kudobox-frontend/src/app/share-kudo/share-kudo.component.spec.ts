import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareKudoComponent } from './share-kudo.component';

describe('ShareKudoComponent', () => {
  let component: ShareKudoComponent;
  let fixture: ComponentFixture<ShareKudoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareKudoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareKudoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
