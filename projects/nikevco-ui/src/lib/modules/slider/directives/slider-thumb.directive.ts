import { Directive, ElementRef, Input, OnChanges, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[nikevcoUiSliderThumb]',
})
export class SliderThumbDirective implements OnInit, OnChanges {
  @Input() translateX!: number;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnChanges(): void {
    this.renderer.setStyle(
      this.el.nativeElement,
      'transform',
      'translate(calc(' + this.translateX + 'px - 50%), -50%)',
    );
  }

  ngOnInit(): void {
    this.renderer.addClass(this.el.nativeElement, 'nikevco-ui-slider-thumb');
  }
}
