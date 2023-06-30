import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[nikevcoUiInput]',
})
export class InputDirective implements OnInit {
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    this.renderer.addClass(this.el.nativeElement, 'nikevco-ui-input');
  }

  triggerClick() {
    this.el.nativeElement.focus();
  }
}
