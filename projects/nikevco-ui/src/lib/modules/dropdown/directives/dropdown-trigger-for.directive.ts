import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { DropdownComponent } from '../components/dropdown/dropdown.component';
import { DROPDOWN_ITEM_SELECTOR } from './dropdown-item.directive';

export const DROPDOWN_TRIGGER_DISABLE_CLASS = 'nikevco-ui-dropdown-trigger-disable';

@Directive({
  selector: '[nikevcoUiDropdownTriggerFor]',
})
export class DropdownTriggerForDirective {
  @Input() nikevcoUiDropdownTriggerFor!: DropdownComponent;

  constructor(private renderer: Renderer2, private el: ElementRef) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (
        e.target !== el.nativeElement &&
        e.target !== this.nikevcoUiDropdownTriggerFor.el.nativeElement &&
        !this.nikevcoUiDropdownTriggerFor.el.nativeElement.contains(e.target)
      ) {
        this.closeDropdown();
      }
    });
  }

  @HostListener('click')
  onClick() {
    if (
      this.el.nativeElement.classList.contains(DROPDOWN_TRIGGER_DISABLE_CLASS) &&
      !this.el.nativeElement.classList.contains(DROPDOWN_ITEM_SELECTOR)
    ) {
      this.closeDropdown();
      return;
    }
    this.openDropdown();
  }

  @HostListener('mouseover')
  onMouseOver() {
    if (this.el.nativeElement.classList.contains(DROPDOWN_ITEM_SELECTOR)) {
      this.openDropdown();
    }
  }

  @HostListener('mouseleave')
  onMouseOut() {
    if (this.el.nativeElement.classList.contains(DROPDOWN_ITEM_SELECTOR)) {
      this.closeDropdown();
    }
  }

  openDropdown() {
    const triggerSize = {
      height: this.el.nativeElement.getBoundingClientRect().height,
      width: this.el.nativeElement.getBoundingClientRect().width,
    };
    const triggerPos = {
      top: this.el.nativeElement.getBoundingClientRect().top,
      left: this.el.nativeElement.getBoundingClientRect().left,
    };

    const triggerIsDropdownItem = this.el.nativeElement.classList.contains(DROPDOWN_ITEM_SELECTOR);
    this.renderer.addClass(this.el.nativeElement, DROPDOWN_TRIGGER_DISABLE_CLASS);
    if (triggerIsDropdownItem) {
      this.el.nativeElement.appendChild(this.nikevcoUiDropdownTriggerFor.el.nativeElement);
    } else {
      this.el.nativeElement.parentNode.insertBefore(
        this.nikevcoUiDropdownTriggerFor.el.nativeElement,
        this.el.nativeElement.nextSibling,
      );
    }
    this.nikevcoUiDropdownTriggerFor.setTriggerParams(triggerSize, triggerPos);
    this.nikevcoUiDropdownTriggerFor.setTriggerIsDropdownItem(triggerIsDropdownItem);
    this.nikevcoUiDropdownTriggerFor.openDropdown();
  }

  closeDropdown() {
    this.renderer.removeClass(this.el.nativeElement, DROPDOWN_TRIGGER_DISABLE_CLASS);
    this.nikevcoUiDropdownTriggerFor.closeDropdown();
  }
}
