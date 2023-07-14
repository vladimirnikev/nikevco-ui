import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipComponent } from './components/chip/chip.component';
import { ChipListComponent } from './components/chip-list/chip-list.component';
import { ChipOptionComponent } from './components/chip-option/chip-option.component';

@NgModule({
  declarations: [ChipComponent, ChipListComponent, ChipOptionComponent],
  imports: [CommonModule],
  exports: [ChipComponent, ChipListComponent, ChipOptionComponent],
})
export class NikevCoChipsModule {}
