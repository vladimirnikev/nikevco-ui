import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'nikevco-ui-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.css'],
})
export class RadioButtonComponent {
  @Input() id: string = 'nikevco-radio-' + Math.random().toString(16).slice(2);

  @Input() value: any;

  @Input() disabled!: boolean;

  @Input() name!: string;

  @Input() labelPosition: 'before' | 'after' = 'after';

  public checked!: boolean;

  @Output() selectEmitter: EventEmitter<any> = new EventEmitter();

  onChange() {
    this.selectEmitter.emit(this.value);
  }
}
