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
} from 'nikevco-ui';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ButtonsPageComponent } from './pages/buttons-page/buttons-page.component';
import { CardsPageComponent } from './pages/cards-page/cards-page.component';
import { CheckboxesPageComponent } from './pages/checkboxes-page/checkboxes-page.component';
import { RadiosPageComponent } from './pages/radios-page/radios-page.component';
import { DropdownPageComponent } from './pages/dropdown-page/dropdown-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonsPageComponent,
    CardsPageComponent,
    CheckboxesPageComponent,
    RadiosPageComponent,
    DropdownPageComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
