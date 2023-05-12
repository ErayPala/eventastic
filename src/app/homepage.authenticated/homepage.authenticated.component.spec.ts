import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageAuthenticatedComponent } from './homepage.authenticated.component';

describe('HomepageAuthenticatedComponent', () => {
  let component: HomepageAuthenticatedComponent;
  let fixture: ComponentFixture<HomepageAuthenticatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepageAuthenticatedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomepageAuthenticatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
