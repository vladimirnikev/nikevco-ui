import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToggleButtonGroupComponent } from './components/toggle-button-group/toggle-button-group.component';
import { ToggleButtonComponent } from './components/toggle-button/toggle-button.component';

@NgModule({
  declarations: [ToggleButtonGroupComponent, ToggleButtonComponent],
  imports: [CommonModule],
  exports: [ToggleButtonComponent, ToggleButtonGroupComponent],
})
export class NikevCoToggleButtonModule {}
