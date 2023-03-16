import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderNKBComponent } from './header-nkb.component';

describe('HeaderNKBComponent', () => {
  let component: HeaderNKBComponent;
  let fixture: ComponentFixture<HeaderNKBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderNKBComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderNKBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
