import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList,
} from '@angular/core';
import { ToggleButtonComponent } from '../toggle-button/toggle-button.component';
import { Subscription } from 'rxjs';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'nikevco-ui-toggle-button-group',
  templateUrl: './toggle-button-group.component.html',
  styleUrls: ['./toggle-button-group.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ToggleButtonGroupComponent,
      multi: true,
    },
  ],
})
export class ToggleButtonGroupComponent
  implements AfterContentInit, OnDestroy, ControlValueAccessor
{
  private sub = new Subscription();

  @ContentChildren(ToggleButtonComponent)
  private _toggleButtons!: QueryList<ToggleButtonComponent>;

  private initialized: boolean = false;

  @Input() value?: string | number | string[] | number[];

  @Output() valueChange = new EventEmitter<string | number | (string | number)[]>();

  @Input() multiple: boolean = false;

  @Input() selected: (string | number)[] = [];

  @Input() disabled: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterContentInit(): void {
    this.initializeToggleButtons();
    this.subscribeToToggleButtonChanges();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  initializeToggleButtons(): void {
    if (!this._toggleButtons) {
      return;
    }

    if (this.multiple) {
      for (const toggleButton of this._toggleButtons) {
        toggleButton.checked = this.selected.includes(toggleButton.value);
      }
      return;
    }

    for (const toggleButton of this._toggleButtons) {
      toggleButton.checked = this.value === toggleButton.value;
    }
  }

  subscribeToToggleButtonChanges() {
    for (const toggleButton of this._toggleButtons) {
      // Set initial settings, if exist
      if (this.disabled) {
        toggleButton.disabled = this.disabled;
      }
      // Subscribe to each changes in radio input
      this.sub.add(
        toggleButton.checkEmitter.subscribe((emittedValue) => {
          if (this.multiple) {
            this.updateMultipleSelection(emittedValue);
          } else {
            this.updateSingleSelection(emittedValue);
          }
        }),
      );
    }
  }

  updateSingleSelection(emittedValue: string | number) {
    this.value = emittedValue;
    for (const toggleButton of this._toggleButtons) {
      if (toggleButton.value !== emittedValue) {
        // Set checked status to false in each toggle button, that have another value
        toggleButton.checked = false;
      } else {
        // Set checked status to true for selected toggle button
        toggleButton.checked = true;
      }
    }
    this.emitValue();
  }

  updateMultipleSelection(emittedValue: string | number) {
    for (const toggleButton of this._toggleButtons) {
      if (toggleButton.value === emittedValue) {
        toggleButton.checked = !toggleButton.checked;
        if (toggleButton.checked) {
          this.selected.push(emittedValue);
        } else {
          this.selected = this.selected.filter((el) => el !== emittedValue);
        }
      }
    }
    this.emitSelected();
  }

  emitValue() {
    this.valueChange.emit(this.value);
    this.onChange(this.value);
  }

  emitSelected() {
    this.valueChange.emit(this.selected);
    this.onChange(this.selected);
  }

  writeValue(value: string | number | (number | string)): void {
    if (value) {
      if (Array.isArray(value)) {
        this.selected = value;
      } else {
        this.value = value;
      }
      this.initializeToggleButtons();
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
}
