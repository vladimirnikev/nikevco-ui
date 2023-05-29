import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './components/slider/slider.component';
import { SliderLabelDirective } from './directives/slider-label.directive';
import { SliderThumbDirective } from './directives/slider-thumb.directive';

@NgModule({
  declarations: [SliderComponent, SliderLabelDirective, SliderThumbDirective],
  imports: [CommonModule],
  exports: [SliderComponent],
})
export class NikevCoSliderModule {}
