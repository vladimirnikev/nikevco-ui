import { Directive, ElementRef, Input } from '@angular/core';

/* eslint-disable-next-line @angular-eslint/directive-selector */
@Directive({ selector: '[indeterminate]' })
export class IndeterminateDirective {
  @Input()
  set indeterminate(value: boolean) {
    this.element.nativeElement.indeterminate = value;
  }

  constructor(private element: ElementRef) {}
}
