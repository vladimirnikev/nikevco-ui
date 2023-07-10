import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompletePageComponent } from './autocomplete-page.component';

describe('AutocompletePageComponent', () => {
  let component: AutocompletePageComponent;
  let fixture: ComponentFixture<AutocompletePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutocompletePageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AutocompletePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
