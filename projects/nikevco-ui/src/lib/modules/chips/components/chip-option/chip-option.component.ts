import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
  Renderer2,
} from '@angular/core';

@Component({
  selector: 'nikevco-ui-chip-option',
  templateUrl: './chip-option.component.html',
  styleUrls: ['./chip-option.component.css'],
})
export class ChipOptionComponent implements AfterViewInit {
  @Input() value: any;

  @Input() id: number = Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));

  @Output() toggleOption = new EventEmitter<boolean>();

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostBinding('class.active') active = false;

  @HostListener('click')
  onClick() {
    this.toggleActive();
  }

  ngAfterViewInit(): void {
    this.renderer.addClass(this.el.nativeElement, 'nikevco-ui-chip');
    this.renderer.addClass(this.el.nativeElement, 'nikevco-ui-chip-option');
  }

  toggleActive() {
    this.active = !this.active;
    this.toggleOption.emit(this.active);
  }

  setInactive() {
    this.active = false;
  }

  setActive() {
    this.active = true;
  }
}
