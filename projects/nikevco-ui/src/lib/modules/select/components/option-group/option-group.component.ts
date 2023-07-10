import { Component, ContentChildren, Input, QueryList } from '@angular/core';
import { OptionComponent } from '../option/option.component';

@Component({
  selector: 'nikevco-ui-option-group',
  templateUrl: './option-group.component.html',
  styleUrls: ['./option-group.component.css'],
})
export class OptionGroupComponent {
  @Input() label!: string;

  @ContentChildren(OptionComponent) options!: QueryList<OptionComponent>;
}
