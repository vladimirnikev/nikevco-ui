import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderPointerComponent } from './slider-pointer.component';

describe('SliderPointerComponent', () => {
  let component: SliderPointerComponent;
  let fixture: ComponentFixture<SliderPointerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SliderPointerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SliderPointerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
