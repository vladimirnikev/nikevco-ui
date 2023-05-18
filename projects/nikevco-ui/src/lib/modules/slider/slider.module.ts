import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './components/slider/slider.component';
import { SliderPointerDirective } from './directives/slider-pointer.directive';
import { SliderStartPointerDirective } from './directives/slider-start-pointer.directive';
import { SliderEndPointerDirective } from './directives/slider-end-pointer.directive';
import { SliderPointerComponent } from './components/slider-pointer/slider-pointer.component';

@NgModule({
  declarations: [
    SliderComponent,
    SliderPointerDirective,
    SliderStartPointerDirective,
    SliderEndPointerDirective,
    SliderPointerComponent,
  ],
  imports: [CommonModule],
  exports: [
    SliderComponent,
    SliderPointerDirective,
    SliderStartPointerDirective,
    SliderEndPointerDirective,
  ],
})
export class NikevCoSliderModule {}
