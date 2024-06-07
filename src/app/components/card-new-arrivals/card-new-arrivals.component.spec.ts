import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardNewArrivalsComponent } from './card-new-arrivals.component';

describe('CardNewArrivalsComponent', () => {
  let component: CardNewArrivalsComponent;
  let fixture: ComponentFixture<CardNewArrivalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardNewArrivalsComponent]
    })
    .compileComponents();
    //
    fixture = TestBed.createComponent(CardNewArrivalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
