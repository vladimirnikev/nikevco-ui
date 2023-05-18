import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  Renderer2,
  SimpleChanges,
  ViewContainerRef,
  forwardRef,
} from '@angular/core';
import { SliderPointerComponent } from '../components/slider-pointer/slider-pointer.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

const RANGE_SLIDER_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SliderPointerDirective),
  multi: true,
};

@Directive({
  selector: '[nikevcoUiSliderPointer]',
  providers: [RANGE_SLIDER_VALUE_ACCESSOR],
})
export class SliderPointerDirective implements AfterViewInit, OnChanges {
  @Input() min: number = 0;

  @Input() max: number = 100;

  @Input() step: number = 1;

  @Input() value!: number;

  @Output() valueEmitter = new EventEmitter();

  protected pointer!: ElementRef;

  onChange: any = () => {};

  onTouched: any = () => {};

  elRef = this.el.nativeElement;

  constructor(
    protected el: ElementRef,
    protected renderer: Renderer2,
    private viewContainerRef: ViewContainerRef,
  ) {}

  writeValue(value: any) {
    this.el.nativeElement.value = value;
    if (this.pointer) {
      this.movePointer();
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  @HostListener('input')
  onInputHandle() {
    this.movePointer();
  }

  @HostListener('mousemove', ['$event'])
  onHover(event: any) {
    if (this.isEventInElement(event, this.pointer)) {
      this.renderer.setStyle(this.el.nativeElement, 'cursor', 'pointer');
      this.renderer.addClass(this.pointer, 'hovered');
    } else {
      this.renderer.removeStyle(this.el.nativeElement, 'cursor');
      this.renderer.removeClass(this.pointer, 'hovered');
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Checking is it manual changes?
    if (!Object.keys(changes).length) {
      this.renderer.setAttribute(this.el.nativeElement, 'min', `${this.min}`);
      this.renderer.setAttribute(this.el.nativeElement, 'max', `${this.max}`);
      this.renderer.setAttribute(this.el.nativeElement, 'step', `${this.step}`);
      this.renderer.setAttribute(this.el.nativeElement, 'value', `${this.value}`);
    }
  }

  ngAfterViewInit(): void {
    this.renderer.addClass(this.el.nativeElement, 'nikevco-ui-slider-pointer');
    this.renderer.setAttribute(this.el.nativeElement, 'type', 'range');
    const componentRef = this.viewContainerRef.createComponent(SliderPointerComponent);
    this.renderer.insertBefore(
      this.el.nativeElement.parentNode,
      componentRef.location.nativeElement,
      this.el.nativeElement.nextSibling,
    );
    this.pointer = componentRef.location.nativeElement;

    // Wait for subscribing in parent component during "NgAfterViewInit"
    setTimeout(() => {
      this.movePointer();
    });
  }

  movePointer() {
    const inputWidth = this.el.nativeElement.offsetWidth;
    const inputValue = this.el.nativeElement.value;
    const inputPaddings = 24;
    const offsetX = (inputWidth / 100) * (((inputValue - this.min) / (this.max - this.min)) * 100);
    const spaceByInputPaddings =
      (((inputPaddings / 100) * (inputValue - this.min)) / (this.max - this.min)) * 100;
    const ownPointerPosition = ((inputValue - this.min) / (this.max - this.min)) * 100;

    // this.renderer.setAttribute(this.el.nativeElement, 'value', inputValue)
    this.renderer.setStyle(
      this.pointer,
      'transform',
      `translate(calc(${offsetX}px - ${ownPointerPosition}% - ${spaceByInputPaddings}px), -50%)`,
    );
    console.log('Input value: ', inputValue);
    this.valueEmitter.emit(+inputValue);
    this.onChange(+inputValue);
  }

  isEventInElement(event: any, element: any) {
    const rect = element.getBoundingClientRect();
    const x = event.clientX;
    if (x < rect.left || x >= rect.right) return false;
    const y = event.clientY;
    if (y < rect.top || y >= rect.bottom) return false;
    return true;
  }
}
