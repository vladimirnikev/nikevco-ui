import { Directive, ElementRef, Input, OnChanges, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[nikevcoUiSliderLabel]',
})
export class SliderLabelDirective implements OnChanges, OnInit {
  @Input() offsetLeft?: number;

  @Input() hidden?: boolean;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnChanges(): void {
    this.renderer.setStyle(
      this.el.nativeElement,
      'transform',
      'translate(calc(' + this.offsetLeft + 'px - 50%))',
    );
    this.renderer.setStyle(this.el.nativeElement, 'opacity', this.hidden ? 0 : 1);
  }

  ngOnInit() {
    this.renderer.addClass(this.el.nativeElement, 'nikevco-ui-slider-label');
  }
}
