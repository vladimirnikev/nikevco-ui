import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from './checkbox.component';
import { FormsModule } from '@angular/forms';
import { IndeterminateDirective } from './indeterminate.directive';

@NgModule({
  declarations: [CheckboxComponent, IndeterminateDirective],
  imports: [CommonModule, FormsModule],
  exports: [CheckboxComponent],
})
export class NikevCoCheckboxModule {}
