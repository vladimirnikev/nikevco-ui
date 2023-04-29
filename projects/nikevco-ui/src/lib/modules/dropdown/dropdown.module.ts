import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { DropdownItemDirective } from './directives/dropdown-item.directive';
import { DropdownTriggerForDirective } from './directives/dropdown-trigger-for.directive';

@NgModule({
  declarations: [DropdownComponent, DropdownItemDirective, DropdownTriggerForDirective],
  imports: [CommonModule],
  exports: [DropdownComponent, DropdownItemDirective, DropdownTriggerForDirective],
})
export class NikevCoDropdownModule {}
