import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeDirective } from './directives/badge.directive';

@NgModule({
  declarations: [BadgeDirective],
  imports: [CommonModule],
  exports: [BadgeDirective],
})
export class NikevCoBadgeModule {}
