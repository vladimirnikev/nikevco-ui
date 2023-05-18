import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject, Subscription, filter } from 'rxjs';
import { DROPDOWN_ITEM_SELECTOR } from '../../directives/dropdown-item.directive';

interface ISize {
  width: number;
  height: number;
}
interface IPos {
  top: number;
  left: number;
}

@Component({
  selector: 'nikevco-ui-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
})
export class DropdownComponent implements OnInit, OnDestroy {
  @Input() xPosition!: 'left' | 'right';

  @Input() yPosition!: 'top' | 'bottom';

  // @ViewChild('dropdown') dropdownRef!: ElementRef;

  @HostBinding('style.left.px')
  leftPosition!: number;

  @HostBinding('style.top.px')
  topPosition!: number;

  @HostListener('click', ['$event.target'])
  onClick(target: any) {
    if (
      Object.values<any>(target.attributes).find(
        (attr: any) => attr.name === DROPDOWN_ITEM_SELECTOR,
      ) &&
      !target.classList.contains('nikevco-ui-dropdown-trigger-disable')
    ) {
      this.closeDropdown();
    }
  }

  private sub = new Subscription();

  private triggerSize!: ISize;

  private triggerPos!: IPos;

  private triggerIsDropdownItem = false;

  public isShow$ = new BehaviorSubject(false);

  constructor(private renderer: Renderer2, public el: ElementRef, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.sub.add(
      this.isShow$.pipe(filter((isShow) => isShow)).subscribe(() => {
        this.setFromLeftPosition(this.triggerPos.left);
        if (this.triggerIsDropdownItem) {
          if (this.xPosition === 'left') {
            this.setLeftPosition();
          } else {
            this.setRightPosition(this.triggerSize.width);
          }
          return;
        }
        if (this.xPosition === 'right') {
          this.setFromRightPosition(this.triggerPos.left, this.triggerSize.width);
        }
        if (this.xPosition === 'left') {
          this.setFromLeftPosition(this.triggerPos.left);
        }
        if (this.yPosition === 'top') {
          this.setAbovePosition(this.triggerPos.top);
        }
        if (this.yPosition === 'bottom') {
          this.setUnderPosition(this.triggerPos.top, this.triggerSize.height);
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  setRightPosition(triggerOffsetWidth: number) {
    this.leftPosition = triggerOffsetWidth;
    this.topPosition = 0;
    this.renderer.removeClass(this.el.nativeElement, 'inner-dropdown-left');
  }

  setLeftPosition() {
    this.leftPosition = 0;
    this.topPosition = 0;
    this.renderer.addClass(this.el.nativeElement, 'inner-dropdown-left');
  }

  setFromRightPosition(triggerOffsetLeft: number, triggerOffsetWidth: number) {
    this.renderer.addClass(this.el.nativeElement, 'right');
    this.renderer.removeClass(this.el.nativeElement, 'left');
    this.leftPosition = triggerOffsetLeft + triggerOffsetWidth;
  }

  setFromLeftPosition(triggerOffsetLeft: number) {
    this.renderer.addClass(this.el.nativeElement, 'left');
    this.renderer.removeClass(this.el.nativeElement, 'right');
    this.leftPosition = triggerOffsetLeft;
  }

  setAbovePosition(triggerOffsetTop: number) {
    this.renderer.addClass(this.el.nativeElement, 'top');
    this.renderer.removeClass(this.el.nativeElement, 'bottom');
    this.topPosition = triggerOffsetTop - this.el.nativeElement.offsetHeight;
  }

  setUnderPosition(triggerOffsetTop: number, triggerOffsetHeight: number) {
    this.renderer.addClass(this.el.nativeElement, 'bottom');
    this.renderer.removeClass(this.el.nativeElement, 'top');
    this.topPosition = triggerOffsetTop + triggerOffsetHeight;
  }

  setTriggerParams(size: ISize, pos: IPos) {
    this.triggerSize = size;
    this.triggerPos = pos;
  }

  setTriggerIsDropdownItem(triggerIsDropdownItem: boolean) {
    this.triggerIsDropdownItem = triggerIsDropdownItem;
  }

  openDropdown() {
    this.isShow$.next(true);
  }

  closeDropdown() {
    this.isShow$.next(false);
  }
}
