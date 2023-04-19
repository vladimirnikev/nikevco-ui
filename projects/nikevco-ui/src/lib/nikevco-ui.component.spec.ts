import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NikevcoUiComponent } from './nikevco-ui.component';

describe('NikevcoUiComponent', () => {
  let component: NikevcoUiComponent;
  let fixture: ComponentFixture<NikevcoUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NikevcoUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NikevcoUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
