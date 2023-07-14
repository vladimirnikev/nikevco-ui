import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ChipOptionComponent } from '../chip-option/chip-option.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'nikevco-ui-chip-list',
  templateUrl: './chip-list.component.html',
  styleUrls: ['./chip-list.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChipListComponent),
      multi: true,
    },
  ],
})
export class ChipListComponent implements AfterContentInit, ControlValueAccessor {
  private sub = new Subscription();

  @ContentChildren(ChipOptionComponent)
  private options?: QueryList<ChipOptionComponent>;

  @Input() disabled = false;

  @Input() value!: any;

  @Output() valueChange = new EventEmitter();

  ngAfterContentInit(): void {
    this.options?.forEach((opt) => {
      if (this.value && this.value === opt.value) {
        opt.setActive();
      }

      this.sub.add(
        opt.toggleOption.subscribe(() => {
          this.options?.forEach((option) => {
            if (opt.id !== option.id) {
              option.setInactive();
              return;
            }

            if (opt.value === this.value) {
              this.value = null;
            } else {
              this.value = option.value;
            }

            this.emitValue();
          });
        }),
      );
    });
  }

  writeValue(value: any): void {
    if (value) {
      this.value = value;
      this.options?.forEach((opt) => {
        if (this.value && this.value === opt.value) {
          opt.setActive();
          return;
        }
        opt.setInactive();
      });
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onChange: any = () => {};

  onTouch: any = () => {};

  emitValue(): void {
    this.onChange(this.value);
    this.valueChange.emit(this.value);
  }
}
