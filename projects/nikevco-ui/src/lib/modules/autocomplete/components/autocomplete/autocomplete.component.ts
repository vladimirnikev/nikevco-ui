import {
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostBinding,
  OnDestroy,
  Output,
  QueryList,
} from '@angular/core';
import { OptionComponent } from '../../../select/components/option/option.component';
import { OptionGroupComponent } from '../../../select/components/option-group/option-group.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'nikevco-ui-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
})
export class AutocompleteComponent implements AfterViewInit, OnDestroy {
  private sub = new Subscription();

  private subContent = new Subscription();

  private isShow = false;

  public DOMElement: HTMLElement;

  private optionList: OptionComponent[] = [];

  @Output() selected = new EventEmitter();

  @ContentChildren(OptionComponent) options!: QueryList<OptionComponent>;

  @ContentChildren(OptionGroupComponent) optionGroups!: QueryList<OptionGroupComponent>;

  @HostBinding('class.active')
  get activeClass(): boolean {
    return this.isShow;
  }

  constructor(private el: ElementRef) {
    this.DOMElement = this.el.nativeElement;
  }

  ngAfterViewInit(): void {
    this.setOptionList();

    this.subContent.add(this.options.changes.subscribe(() => this.setOptionList()));

    this.subContent.add(this.optionGroups.changes.subscribe(() => this.setOptionList()));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.subContent.unsubscribe();
  }

  open() {
    this.isShow = true;
  }

  close() {
    this.isShow = false;
  }

  getFirstOptionValue() {
    return this.optionList.length > 0 ? this.optionList[0].value : null;
  }

  getOptionsList(): OptionComponent[] {
    return this.optionList;
  }

  setOptionList() {
    this.optionList.forEach((option) => {
      this.sub.remove(option.selected);
    });

    this.optionList = [];

    if (this.options.length) {
      this.options.forEach((opt) => this.optionList.push(opt));
    }

    if (this.optionGroups.length) {
      this.optionGroups.forEach((group) => {
        group.options.forEach((opt) => this.optionList.push(opt));
      });
    }

    this.optionList.forEach((option) => {
      this.sub.add(
        option.selected.subscribe((value) => {
          this.selected.emit(value);
        }),
      );
    });
  }
}
