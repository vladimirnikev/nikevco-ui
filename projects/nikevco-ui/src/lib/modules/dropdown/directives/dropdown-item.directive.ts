import { AfterViewInit, Directive, ElementRef, Input, Renderer2 } from '@angular/core';

export const DROPDOWN_ITEM_SELECTOR = 'nikevco-ui-dropdown-item';

@Directive({
  selector: `[${DROPDOWN_ITEM_SELECTOR}]`,
})
export class DropdownItemDirective implements AfterViewInit {
  @Input() disabled = false;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngAfterViewInit() {
    this.renderer.addClass(this.el.nativeElement, DROPDOWN_ITEM_SELECTOR);
    if (this.disabled) {
      this.renderer.addClass(this.el.nativeElement, 'nikevco-ui-dropdown-item-disabled');
    }
  }
}
