import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { NikevCoSelectModule } from '../select/select.module';
import { OptionComponent } from '../select/components/option/option.component';
import { AutocompleteDirective } from './directives/autocomplete.directive';

@NgModule({
  declarations: [AutocompleteComponent, AutocompleteDirective],
  imports: [CommonModule, NikevCoSelectModule],
  exports: [AutocompleteComponent, AutocompleteDirective, OptionComponent],
})
export class NikevCoAutocompleteModule {}
