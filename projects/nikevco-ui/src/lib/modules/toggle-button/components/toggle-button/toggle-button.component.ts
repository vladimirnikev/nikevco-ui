import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';

@Component({
  selector: 'nikevco-ui-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.css'],
})
export class ToggleButtonComponent implements OnInit {
  @Input() value!: string | number;

  @Output() checkEmitter = new EventEmitter<string | number>();

  @Input() checked: boolean = false;

  @Input() disabled: boolean = false;

  @HostBinding('class.checked')
  get checkedClass(): boolean {
    return this.checked;
  }

  @HostBinding('class.disabled')
  get disabledClass(): boolean {
    return this.disabled;
  }

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    this.renderer.addClass(this.el.nativeElement, 'nikevco-ui-toggle');
  }

  onCheck() {
    this.checkEmitter.emit(this.value);
  }
}
