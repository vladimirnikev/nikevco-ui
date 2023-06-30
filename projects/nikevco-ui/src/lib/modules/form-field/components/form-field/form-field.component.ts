import {
  AfterViewInit,
  Component,
  ContentChild,
  ContentChildren,
  OnDestroy,
  QueryList,
  Renderer2,
} from '@angular/core';
import { InputDirective } from '../../../input/directives/input.directive';
import { ErrorComponent } from '../error/error.component';
import { HintComponent } from '../hint/hint.component';
import { Subscription } from 'rxjs';
import { SelectComponent } from '../../../select/components/select/select.component';

@Component({
  selector: 'nikevco-ui-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.css'],
})
export class FormFieldComponent implements AfterViewInit, OnDestroy {
  private sub = new Subscription();

  @ContentChild(InputDirective) inputDirective?: InputDirective;

  @ContentChild(SelectComponent) selectComponent?: SelectComponent;

  @ContentChildren(ErrorComponent) errorRefs!: QueryList<any>;

  @ContentChildren(HintComponent) hintRefs!: QueryList<any>;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.handleContentVisibility();
    this.sub.add(
      this.errorRefs?.changes.subscribe(() => {
        this.handleContentVisibility();
      }),
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  handleContentVisibility() {
    const hasError = this.errorRefs.length;
    this.hintRefs.forEach((elRef) => {
      const hintEl = elRef.el.nativeElement;
      this.renderer.setStyle(hintEl, 'display', hasError ? 'none' : '');
    });
  }

  triggerInput(event: Event) {
    if (this.inputDirective) {
      this.inputDirective.triggerClick();
    }

    if (this.selectComponent && !this.selectComponent.nativeElement.contains(event.target)) {
      this.selectComponent.triggerClick();
    }
  }
}
