import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioGroupComponent } from './components/radio-group/radio-group.component';
import { RadioButtonComponent } from './components/radio-button/radio-button.component';

@NgModule({
  declarations: [RadioGroupComponent, RadioButtonComponent],
  imports: [CommonModule],
  exports: [RadioGroupComponent, RadioButtonComponent],
})
export class NikevCoRadioModule {}
