import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlasmaDonationComponent } from './plasma-donation.component';

describe('PlasmaDonationComponent', () => {
  let component: PlasmaDonationComponent;
  let fixture: ComponentFixture<PlasmaDonationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlasmaDonationComponent]
    });
    fixture = TestBed.createComponent(PlasmaDonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
