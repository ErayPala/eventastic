import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderKBComponent } from './header-kb.component';

describe('HeaderKBComponent', () => {
  let component: HeaderKBComponent;
  let fixture: ComponentFixture<HeaderKBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderKBComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderKBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
