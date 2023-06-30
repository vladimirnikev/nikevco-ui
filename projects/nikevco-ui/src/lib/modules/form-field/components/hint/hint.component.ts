import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'nikevco-ui-hint',
  templateUrl: './hint.component.html',
  styleUrls: ['./hint.component.css'],
})
export class HintComponent implements OnInit {
  @Input() align: 'start' | 'end' = 'start';

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    this.renderer.addClass(
      this.el.nativeElement,
      this.align === 'start' ? 'nikevco-ui-hint-start' : 'nikevco-ui-hint-end',
    );
  }
}
