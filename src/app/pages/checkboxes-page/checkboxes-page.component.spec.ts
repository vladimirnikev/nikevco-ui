import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxesPageComponent } from './checkboxes-page.component';

describe('CheckboxesPageComponent', () => {
  let component: CheckboxesPageComponent;
  let fixture: ComponentFixture<CheckboxesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckboxesPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckboxesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
