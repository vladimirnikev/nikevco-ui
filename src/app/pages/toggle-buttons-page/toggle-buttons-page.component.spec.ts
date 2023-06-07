import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleButtonsPageComponent } from './toggle-buttons-page.component';

describe('ToggleButtonsPageComponent', () => {
  let component: ToggleButtonsPageComponent;
  let fixture: ComponentFixture<ToggleButtonsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToggleButtonsPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ToggleButtonsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
