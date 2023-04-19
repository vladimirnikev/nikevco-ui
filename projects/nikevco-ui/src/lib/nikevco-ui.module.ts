import { NgModule } from '@angular/core';
import { NikevcoUiComponent } from './nikevco-ui.component';
import { ColorDirective } from './directives/color.directive';

@NgModule({
  declarations: [NikevcoUiComponent, ColorDirective],
  exports: [NikevcoUiComponent, ColorDirective],
})
export class NikevCoUIModule {}
