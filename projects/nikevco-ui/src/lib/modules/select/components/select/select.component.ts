import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  Output,
  QueryList,
  ViewChild,
  forwardRef,
} from '@angular/core';
import { OptionComponent } from '../option/option.component';
import { Subscription } from 'rxjs';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'nikevco-ui-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements OnDestroy, AfterContentInit, ControlValueAccessor {
  private sub = new Subscription();

  @ViewChild('menu') menu!: ElementRef;

  @ContentChildren(OptionComponent) optionComponents!: QueryList<OptionComponent>;

  @Input() value!: any;

  public isHidden = true;

  @Output() valueChange = new EventEmitter();

  constructor(private el: ElementRef) {}

  @HostListener('document:click', ['$event.target'])
  onClick(targetElement: any) {
    const clickedOutside =
      targetElement !== this.menu.nativeElement &&
      !this.menu.nativeElement.contains(targetElement) &&
      targetElement !== this.el.nativeElement &&
      targetElement !== this.el.nativeElement.parentNode;

    const clickedMenu =
      (targetElement === this.el.nativeElement || this.el.nativeElement.contains(targetElement)) &&
      targetElement !== this.menu.nativeElement &&
      !this.menu.nativeElement.contains(targetElement);

    if (clickedOutside) {
      this.isHidden = true;
      return;
    }

    if (clickedMenu) {
      this.isHidden = !this.isHidden;
    }
  }

  ngAfterContentInit() {
    this.optionComponents.forEach((option) => {
      this.sub.add(
        option.selected.subscribe((value: any) => {
          this.onSelect(value);
        }),
      );
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  onChange: any = () => {};

  onTouch: any = () => {};

  triggerClick() {
    this.toggleDropdown();
  }

  toggleDropdown() {
    this.isHidden = !this.isHidden;
  }

  get nativeElement() {
    return this.el.nativeElement;
  }

  onSelect(value: any) {
    this.value = value;
    this.emitValue();
    this.isHidden = true;
  }

  emitValue() {
    this.onChange(this.value);
    this.valueChange.emit(this.value);
  }
}
