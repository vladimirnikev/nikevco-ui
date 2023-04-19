import { Directive, ElementRef, Input, OnChanges, OnInit, Renderer2 } from '@angular/core';
import { TColor } from '../common/color.type';
import { EPrefix } from '../common/prefix.enum';

/* eslint-disable @angular-eslint/directive-selector */
@Directive({
  selector: '[color]',
})
export class ColorDirective implements OnInit, OnChanges {
  @Input() color!: TColor;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.renderer.addClass(this.el.nativeElement, `${EPrefix.NIKEVCO}-${this.color}`);
  }

  ngOnChanges(changes: any) {
    this.renderer.removeClass(
      this.el.nativeElement,
      `${EPrefix.NIKEVCO}-${changes.color.previousValue}`,
    );
    this.renderer.addClass(this.el.nativeElement, `${EPrefix.NIKEVCO}-${this.color}`);
  }
}
