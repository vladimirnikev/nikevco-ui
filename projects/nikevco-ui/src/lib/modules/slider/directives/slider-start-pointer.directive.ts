import { Directive, ElementRef, Renderer2, ViewContainerRef, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SliderPointerDirective } from './slider-pointer.directive';

const RANGE_SLIDER_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SliderStartPointerDirective),
  multi: true,
};
@Directive({
  selector: '[nikevcoUiSliderStartPointer]',
  providers: [RANGE_SLIDER_VALUE_ACCESSOR],
})
export class SliderStartPointerDirective extends SliderPointerDirective {
  constructor(el: ElementRef, renderer: Renderer2, viewContainerRef: ViewContainerRef) {
    super(el, renderer, viewContainerRef);
    renderer.addClass(el.nativeElement, 'nikevco-ui-slider-start-pointer');
  }

  override movePointer() {
    const inputWidth = this.el.nativeElement.offsetWidth;
    const inputValue = this.el.nativeElement.value;
    const inputPaddings = 24;
    const offsetX = (inputWidth / 100) * (((inputValue - this.min) / (this.max - this.min)) * 100);
    const spaceByInputPaddings =
      ((((inputPaddings / 100) * (inputValue - this.min)) / (this.max - this.min)) * 100) / 2;
    const ownPointerPosition = ((inputValue - this.min) / (this.max - this.min)) * 100;

    this.renderer.setAttribute(this.el.nativeElement, 'value', inputValue);
    this.renderer.setStyle(
      this.pointer,
      'transform',
      `translate(calc(${offsetX}px - ${ownPointerPosition}% - ${spaceByInputPaddings}px), -50%)`,
    );
    console.log('Input value: ', inputValue);
    this.valueEmitter.emit(+inputValue);
    this.onChange(+inputValue);
  }
}
