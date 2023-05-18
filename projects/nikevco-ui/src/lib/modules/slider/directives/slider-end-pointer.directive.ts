import { Directive, ElementRef, Renderer2, ViewContainerRef } from '@angular/core';
import { SliderPointerDirective } from './slider-pointer.directive';

@Directive({
  selector: '[nikevcoUiSliderEndPointer]',
})
export class SliderEndPointerDirective extends SliderPointerDirective {
  public startSliderInputWidth!: number;

  constructor(el: ElementRef, renderer: Renderer2, viewContainerRef: ViewContainerRef) {
    super(el, renderer, viewContainerRef);
    renderer.addClass(el.nativeElement, 'nikevco-ui-slider-end-pointer');
  }

  override movePointer() {
    // console.log('kek')
    const inputPaddings = 24;
    const inputWidth = this.el.nativeElement.offsetWidth;
    const inputValue = this.el.nativeElement.value;
    // console.log(th)
    console.log('Start slider width in end input:', this.startSliderInputWidth);
    console.log(inputWidth);
    const offsetX =
      this.startSliderInputWidth +
      (inputWidth / 100) * (((inputValue - this.min) / (this.max - this.min)) * 100);
    // const offsetX = 20 + inputWidth / 100 * ((inputValue - this.min) / (this.max - this.min) * 100);
    const spaceByInputPaddings =
      (((inputPaddings / 100) * (inputValue - this.min)) / (this.max - this.min)) * 100;
    // const spaceByInputPaddings = 0
    const ownPointerPosition = ((inputValue - this.min) / (this.max - this.min)) * 100;
    console.log('End value: ', inputValue);
    this.renderer.setAttribute(this.el.nativeElement, 'value', inputValue);
    this.renderer.setStyle(
      this.pointer,
      'transform',
      `translate(calc(${offsetX}px - ${ownPointerPosition}% - ${
        spaceByInputPaddings / 2
      }px), -50%)`,
    );
    this.valueEmitter.emit(+inputValue);
    this.onChange(+inputValue);
  }
}
