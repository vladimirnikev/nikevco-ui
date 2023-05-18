import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ContentChild,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { SliderPointerDirective } from '../../directives/slider-pointer.directive';
import { Subscription } from 'rxjs';
import { SliderStartPointerDirective } from '../../directives/slider-start-pointer.directive';
import { SliderEndPointerDirective } from '../../directives/slider-end-pointer.directive';

@Component({
  selector: 'nikevco-ui-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  private sub = new Subscription();

  @ContentChild(SliderPointerDirective)
  input!: SliderPointerDirective;

  @ContentChild(SliderStartPointerDirective)
  startInput!: SliderStartPointerDirective;

  @ContentChild(SliderEndPointerDirective)
  endInput!: SliderEndPointerDirective;

  @Input() min = 0;

  @Input() max = 100;

  @Input() sliderValue!: number;

  @Input() step: number = 1;

  @Input() value: number = this.min;

  public filledLineWidth!: number;

  public filledLineLeftPosition!: number;

  private startInputWidth?: number;

  private endInputWidth?: number;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes)
    if (this.input) {
      this.setInputParams(this.input, this.value);
    }
  }

  ngAfterContentInit() {
    console.log(this.startInput);
    console.log(this.endInput);
  }

  ngAfterViewInit(): void {
    if (this.input) {
      this.setInputParams(this.input, this.value);
      this.sub.add(
        this.input.valueEmitter.subscribe((value) => {
          this.filledLineWidth =
            (this.el.nativeElement.offsetWidth / 100) *
            (((value - this.min) / (this.max - this.min)) * 100);
        }),
      );
    }

    if (this.startInput) {
      this.setInputParams(this.startInput, this.min);
      this.sub.add(
        this.startInput.valueEmitter.subscribe((value: number) => {
          console.log('Start value changed: ', value);
          const inputPaddings = 24;
          if (value === this.min) {
            this.startInputWidth = (20 / this.el.nativeElement.offsetWidth) * 100;
          } else {
            this.startInputWidth = ((value - this.min) / (this.max - this.min)) * 100;
          }
          console.log('Start input width: ', this.startInputWidth);

          this.endInput.startSliderInputWidth =
            (this.startInputWidth / 100) * this.el.nativeElement.offsetWidth;
          this.endInput.min = value + this.step;
          this.endInput.ngOnChanges({});

          this.startInput.max = +this.endInput.elRef.value - this.step;
          this.startInput.ngOnChanges({});

          this.renderer.setStyle(this.startInput.elRef, 'width', `calc(${this.startInputWidth}%)`);
          this.renderer.setStyle(
            this.endInput.elRef,
            'width',
            `calc(100% - ${this.startInputWidth}%)`,
          );
          this.renderer.setStyle(this.endInput.elRef, 'left', `calc(${this.startInputWidth}%)`);
        }),
      );
    }

    if (this.endInput) {
      this.setInputParams(this.endInput, this.max);
      this.sub.add(
        this.endInput.valueEmitter.subscribe((value) => {
          console.log('End value changed: ', value);
          const inputPaddings = 24;

          this.startInput.max = +value - this.step;
          this.startInput.ngOnChanges({});
          this.endInput.min = +this.startInput.elRef.value + this.step;
          this.endInput.ngOnChanges({});

          this.renderer.setStyle(
            this.endInput.elRef,
            'width',
            `calc(100% - ${this.startInputWidth}%)`,
          );
        }),
      );
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  setInputParams(input: SliderPointerDirective, value: number) {
    input.min = this.min;
    input.max = this.max;
    input.step = this.step;
    input.value = value;
    input.ngOnChanges({});
  }

  // TODO
  // 1) matSliderStartThumb, matSliderEndThumb
  // 2) label with value above slider
  // 3) active after click
  // 4) keyboard events
}
