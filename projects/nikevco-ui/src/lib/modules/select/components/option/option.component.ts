import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'nikevco-ui-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.css'],
})
export class OptionComponent {
  @Output() selected = new EventEmitter();

  @Input() value: any;

  @HostListener('click')
  onClick() {
    this.selected.emit(this.value);
  }
}
