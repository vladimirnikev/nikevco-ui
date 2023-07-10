import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './components/select/select.component';
import { OptionComponent } from './components/option/option.component';
import { OptionGroupComponent } from './components/option-group/option-group.component';

@NgModule({
  declarations: [SelectComponent, OptionComponent, OptionGroupComponent],
  imports: [CommonModule],
  exports: [SelectComponent, OptionComponent, OptionGroupComponent],
})
export class NikevCoSelectModule {}
