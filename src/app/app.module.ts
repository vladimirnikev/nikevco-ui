import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {
  NikevCoButtonModule,
  NikevCoCheckboxModule,
  NikevCoIconModule,
  NikevCoUIModule,
  NikevCoCardModule,
  NikevCoRadioModule,
  NikevCoDropdownModule,
  NikevCoSliderModule,
  NikevCoBadgeModule,
  NikevCoToggleButtonModule,
  NikevCoFormFieldModule,
  NikevCoSelectModule,
  NikevCoInputModule,
  NikevCoAutocompleteModule,
  NikevCoChipsModule,
} from 'nikevco-ui';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ButtonsPageComponent } from './pages/buttons-page/buttons-page.component';
import { CardsPageComponent } from './pages/cards-page/cards-page.component';
import { CheckboxesPageComponent } from './pages/checkboxes-page/checkboxes-page.component';
import { RadiosPageComponent } from './pages/radios-page/radios-page.component';
import { DropdownPageComponent } from './pages/dropdown-page/dropdown-page.component';
import { SliderPageComponent } from './pages/slider-page/slider-page.component';
import { BadgePageComponent } from './pages/badge-page/badge-page.component';
import { ToggleButtonsPageComponent } from './pages/toggle-buttons-page/toggle-buttons-page.component';
import { FormFieldsPageComponent } from './pages/form-fields-page/form-fields-page.component';
import { AutocompletePageComponent } from './pages/autocomplete-page/autocomplete-page.component';
import { ChipsPageComponent } from './pages/chips-page/chips-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonsPageComponent,
    CardsPageComponent,
    CheckboxesPageComponent,
    RadiosPageComponent,
    DropdownPageComponent,
    SliderPageComponent,
    BadgePageComponent,
    ToggleButtonsPageComponent,
    FormFieldsPageComponent,
    AutocompletePageComponent,
    ChipsPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NikevCoUIModule,
    NikevCoButtonModule,
    NikevCoIconModule,
    NikevCoCardModule,
    NikevCoCheckboxModule,
    NikevCoRadioModule,
    NikevCoDropdownModule,
    NikevCoSliderModule,
    NikevCoBadgeModule,
    NikevCoToggleButtonModule,
    NikevCoFormFieldModule,
    NikevCoSelectModule,
    NikevCoInputModule,
    NikevCoAutocompleteModule,
    NikevCoChipsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
