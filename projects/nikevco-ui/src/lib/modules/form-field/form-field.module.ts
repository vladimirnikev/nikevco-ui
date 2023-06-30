import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { LabelComponent } from './components/label/label.component';
import { HintComponent } from './components/hint/hint.component';
import { ErrorComponent } from './components/error/error.component';

@NgModule({
  declarations: [FormFieldComponent, LabelComponent, HintComponent, ErrorComponent],
  imports: [CommonModule],
  exports: [FormFieldComponent, LabelComponent, HintComponent, ErrorComponent],
})
export class NikevCoFormFieldModule {}
