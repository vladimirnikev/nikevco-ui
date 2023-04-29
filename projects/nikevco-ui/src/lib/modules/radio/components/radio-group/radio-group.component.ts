import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  AfterContentInit,
  Component,
  ContentChildren,
  Input,
  OnDestroy,
  QueryList,
} from '@angular/core';
import { RadioButtonComponent } from '../radio-button/radio-button.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'nikevco-ui-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: RadioGroupComponent,
      multi: true,
    },
  ],
})
export class RadioGroupComponent implements AfterContentInit, OnDestroy, ControlValueAccessor {
  @ContentChildren(RadioButtonComponent)
  private _radioButtons!: QueryList<RadioButtonComponent>;

  private sub = new Subscription();

  @Input() disabled!: boolean;

  @Input() labelPosition!: 'before' | 'after';

  ngAfterContentInit() {
    for (const radioButton of this._radioButtons) {
      // Set initial settings, if exist
      if (this.disabled !== undefined) {
        radioButton.disabled = this.disabled;
      }
      if (this.labelPosition) {
        radioButton.labelPosition = this.labelPosition;
      }
      // Subscribe to each changes in radio input
      this.sub.add(
        radioButton.selectEmitter.subscribe((emittedValue) => {
          for (const otherRadioButton of this._radioButtons) {
            if (otherRadioButton.value !== emittedValue) {
              // Set checked status to false in each input, that have another value
              otherRadioButton.checked = false;
            } else {
              // Set checked status to true for selected input
              radioButton.checked = true;
            }
          }
          this.onChange(emittedValue);
        }),
      );
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  writeValue(value: any): void {
    if (value) {
      // Wait for init radio buttons
      setTimeout(() => {
        // Set checked status to true in each input, that have same value
        this._radioButtons.forEach((el) => {
          if (value === el.value) {
            // Set checked value in component, that have same index with ref
            el.checked = true;
          }
        });
      }, 0);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onChange: any = () => {};

  onTouch: any = () => {};
}
