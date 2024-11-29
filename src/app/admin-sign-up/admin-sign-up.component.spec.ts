import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSignUPComponent } from './admin-sign-up.component';

describe('AdminSignUPComponent', () => {
  let component: AdminSignUPComponent;
  let fixture: ComponentFixture<AdminSignUPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSignUPComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSignUPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
