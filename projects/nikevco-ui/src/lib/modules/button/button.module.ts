import { NgModule } from '@angular/core';
import { ButtonDirective } from './directives/button.directive';
import { RaisedButtonDirective } from './directives/raised-button.directive';
import { StrokedButtonDirective } from './directives/stroked-button.directive';
import { FlatButtonDirective } from './directives/flat-button.directive';
import { IconButtonDirective } from './directives/icon-button.directive';

@NgModule({
  declarations: [
    ButtonDirective,
    RaisedButtonDirective,
    StrokedButtonDirective,
    FlatButtonDirective,
    IconButtonDirective,
  ],
  imports: [],
  exports: [
    ButtonDirective,
    RaisedButtonDirective,
    StrokedButtonDirective,
    FlatButtonDirective,
    IconButtonDirective,
  ],
})
export class NikevCoButtonModule {}
