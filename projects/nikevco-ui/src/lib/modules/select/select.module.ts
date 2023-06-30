import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './components/select/select.component';
import { OptionComponent } from './components/option/option.component';

@NgModule({
  declarations: [SelectComponent, OptionComponent],
  imports: [CommonModule],
  exports: [SelectComponent, OptionComponent],
})
export class NikevCoSelectModule {}
