import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErstellenComponent } from './erstellen.component';

describe('ErstellenComponent', () => {
  let component: ErstellenComponent;
  let fixture: ComponentFixture<ErstellenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErstellenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErstellenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
