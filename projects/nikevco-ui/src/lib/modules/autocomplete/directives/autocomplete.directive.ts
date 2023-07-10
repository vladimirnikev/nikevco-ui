import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AutocompleteComponent } from '../components/autocomplete/autocomplete.component';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[nikevcoUiAutocomplete]',
  exportAs: 'nikevcoUiAutocomplete',
})
export class AutocompleteDirective implements OnInit, AfterViewInit, OnDestroy {
  private sub = new Subscription();

  @Input('nikevcoUiAutocomplete') autocompleteElementRef!: AutocompleteComponent;

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('autoSelectFirstOption') isSelectFirst?: boolean;

  private isSelectedFirst = false;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.sub.add(
      this.autocompleteElementRef.selected.subscribe((value) => {
        this.setInputValue(value);
      }),
    );
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.isSelectFirst) {
        const firstOptionValue = this.autocompleteElementRef.getFirstOptionValue();
        this.setInputValue(firstOptionValue);
      }
    }, 0);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  @HostListener('focus')
  onFocus() {
    this.autocompleteElementRef.open();
  }

  @HostListener('document:click', ['$event.target'])
  onClick(target: any) {
    const isInput = target === this.el.nativeElement || target === this.el.nativeElement.parentNode;
    const isDropdownOption = this.autocompleteElementRef
      .getOptionsList()
      .find((el) => el.DOMElement === target);
    const isDropdown =
      target === this.autocompleteElementRef.DOMElement ||
      this.autocompleteElementRef.DOMElement.contains(target);
    const isDisabled = this.el.nativeElement.disabled;

    if ((!isInput && isDropdownOption) || (!isInput && !isDropdown)) {
      this.autocompleteElementRef.close();
    }

    if (isInput && !isDisabled) {
      this.autocompleteElementRef.open();
    }
  }

  @HostListener('input')
  onInput() {
    if (this.isSelectFirst && !this.isSelectedFirst) {
      this.isSelectedFirst = true;
      return;
    }
    this.autocompleteElementRef.open();
  }

  private setInputValue(value: any) {
    this.el.nativeElement.value = value;
    const inputEvent = new Event('input', { bubbles: true });
    this.el.nativeElement.dispatchEvent(inputEvent);
  }
}
