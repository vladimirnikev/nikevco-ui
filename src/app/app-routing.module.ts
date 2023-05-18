import { CheckboxesPageComponent } from './pages/checkboxes-page/checkboxes-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ButtonsPageComponent } from './pages/buttons-page/buttons-page.component';
import { CardsPageComponent } from './pages/cards-page/cards-page.component';
import { RadiosPageComponent } from './pages/radios-page/radios-page.component';
import { DropdownPageComponent } from './pages/dropdown-page/dropdown-page.component';
import { SliderPageComponent } from './pages/slider-page/slider-page.component';

const routes: Routes = [
  {
    path: 'buttons',
    component: ButtonsPageComponent,
  },
  {
    path: 'cards',
    component: CardsPageComponent,
  },
  {
    path: 'checkboxes',
    component: CheckboxesPageComponent,
  },
  {
    path: 'radios',
    component: RadiosPageComponent,
  },
  {
    path: 'dropdowns',
    component: DropdownPageComponent,
  },
  {
    path: 'sliders',
    component: SliderPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
