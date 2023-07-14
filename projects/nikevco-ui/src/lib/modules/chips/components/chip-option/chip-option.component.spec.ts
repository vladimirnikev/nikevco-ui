import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipOptionComponent } from './chip-option.component';

describe('ChipOptionComponent', () => {
  let component: ChipOptionComponent;
  let fixture: ComponentFixture<ChipOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChipOptionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChipOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
