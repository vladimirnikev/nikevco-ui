import { TBadgePosition } from '../../../common/badge-position.type';
import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { TColor } from '../../../common/color.type';
import { TBadgeSize } from '../../../common/badge-size.type';

@Directive({
  selector: '[nikevcoBadge]',
})
export class BadgeDirective implements OnInit, OnChanges {
  @Input('nikevcoBadge') content!: string | number;

  @Input('nikevcoBadgeOverlap') overlap = true;

  @Input('nikevcoBadgeSize') size: TBadgeSize = 'medium';

  @Input('nikevcoBadgePosition') position: TBadgePosition = 'after';

  @Input('nikevcoBadgeColor') color: TColor = 'primary';

  @Input('nikevcoBadgeHidden') hidden = false;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    this.renderer.addClass(this.el.nativeElement, 'nikevco-ui-badge');
    this.createBadge();
    this.setPosition();
    this.setSize();
    this.setOverlapping();
    this.setColor();
    this.hide();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['content'] && !changes['content']?.isFirstChange()) {
      this.createBadge();
    }
    if (changes['position'] && !changes['position']?.isFirstChange()) {
      this.setPosition();
    }
    if (changes['size'] && !changes['size']?.isFirstChange()) {
      this.setSize();
    }
    if (changes['overlap'] && !changes['overlap']?.isFirstChange()) {
      this.setOverlapping();
    }
    if (changes['color'] && !changes['color']?.isFirstChange()) {
      this.setColor();
    }
    if (changes['hidden'] && !changes['hidden']?.isFirstChange()) {
      this.hide();
    }
  }

  createBadge() {
    const badgeComponent = this.renderer.createElement('span');
    const text = this.renderer.createText(`${this.content}`);

    this.renderer.addClass(badgeComponent, 'nikevco-ui-badge-content');
    this.renderer.appendChild(badgeComponent, text);

    const existingBadge = this.el.nativeElement.querySelector('.nikevco-ui-badge-content');
    if (existingBadge) {
      this.renderer.removeChild(this.el.nativeElement, existingBadge);
    }

    this.renderer.appendChild(this.el.nativeElement, badgeComponent);
  }

  setPosition() {
    this.renderer.addClass(this.el.nativeElement, 'nikevco-ui-badge-above');
    this.renderer.addClass(this.el.nativeElement, 'nikevco-ui-badge-after');

    if (this.position.includes('after')) {
      this.renderer.removeClass(this.el.nativeElement, 'nikevco-ui-badge-before');
      this.renderer.addClass(this.el.nativeElement, 'nikevco-ui-badge-after');
    }
    if (this.position.includes('before')) {
      this.renderer.removeClass(this.el.nativeElement, 'nikevco-ui-badge-after');
      this.renderer.addClass(this.el.nativeElement, 'nikevco-ui-badge-before');
    }
    if (this.position.includes('above')) {
      this.renderer.removeClass(this.el.nativeElement, 'nikevco-ui-badge-below');
      this.renderer.addClass(this.el.nativeElement, 'nikevco-ui-badge-above');
    }
    if (this.position.includes('below')) {
      this.renderer.removeClass(this.el.nativeElement, 'nikevco-ui-badge-above');
      this.renderer.addClass(this.el.nativeElement, 'nikevco-ui-badge-below');
    }
  }

  setSize() {
    if (this.size === 'small') {
      this.renderer.addClass(this.el.nativeElement, 'nikevco-ui-badge-small');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'nikevco-ui-badge-small');
    }

    if (this.size === 'medium') {
      this.renderer.addClass(this.el.nativeElement, 'nikevco-ui-badge-medium');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'nikevco-ui-badge-medium');
    }

    if (this.size === 'large') {
      this.renderer.addClass(this.el.nativeElement, 'nikevco-ui-badge-large');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'nikevco-ui-badge-large');
    }
  }

  setOverlapping() {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this.overlap
      ? this.renderer.addClass(this.el.nativeElement, 'nikevco-ui-badge-overlap')
      : this.renderer.removeClass(this.el.nativeElement, 'nikevco-ui-badge-overlap');
  }

  setColor() {
    if (this.color === 'primary') {
      this.renderer.addClass(this.el.nativeElement, 'nikevco-ui-badge-primary');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'nikevco-ui-badge-primary');
    }

    if (this.color === 'secondary') {
      this.renderer.addClass(this.el.nativeElement, 'nikevco-ui-badge-secondary');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'nikevco-ui-badge-secondary');
    }

    if (this.color === 'warn') {
      this.renderer.addClass(this.el.nativeElement, 'nikevco-ui-badge-warn');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'nikevco-ui-badge-warn');
    }

    if (this.color === 'danger') {
      this.renderer.addClass(this.el.nativeElement, 'nikevco-ui-badge-danger');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'nikevco-ui-badge-danger');
    }

    if (this.color === 'success') {
      this.renderer.addClass(this.el.nativeElement, 'nikevco-ui-badge-success');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'nikevco-ui-badge-success');
    }
  }

  hide() {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this.hidden
      ? this.renderer.addClass(this.el.nativeElement, 'nikevco-ui-badge-hidden')
      : this.renderer.removeClass(this.el.nativeElement, 'nikevco-ui-badge-hidden');
  }
}
