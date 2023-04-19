import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiosPageComponent } from './radios-page.component';

describe('RadiosPageComponent', () => {
  let component: RadiosPageComponent;
  let fixture: ComponentFixture<RadiosPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RadiosPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RadiosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
