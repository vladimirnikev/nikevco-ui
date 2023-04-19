import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

/* eslint-disable @angular-eslint/directive-selector */
@Directive({
  selector: '[nikevco-button]',
})
export class ButtonDirective implements OnInit {
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    this.renderer.addClass(this.el.nativeElement, 'nikevco-btn');
    this.renderer.addClass(this.el.nativeElement, 'nikevco-common-btn');
  }
}
