import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'nikevco-ui-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SliderComponent,
      multi: true,
    },
  ],
})
export class SliderComponent implements OnInit, OnChanges, AfterViewInit, ControlValueAccessor {
  @Input() highValue?: number;

  @Input() min = 0;

  @Input() max = 100;

  @Input() sliderValue!: number;

  @Input() step: number = 1;

  @Input() value: number = this.min;

  @Input() showValues: boolean = true;

  @Output() valueChange = new EventEmitter<number[]>();

  private isMovingThumb = false;

  private thumbIndex?: number;

  public thumbPositions: number[] = [0];

  public values: number[] = [];

  private oldX: number = 0;

  public isLabelOverlap?: boolean;

  @ViewChildren('thumbLabel') thumbLabels!: QueryList<ElementRef>;

  @ViewChild('minLabel') minValueLabel!: ElementRef;

  @ViewChild('maxLabel') maxValueLabel!: ElementRef;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  writeValue(values: number[]): void {
    if (values) {
      this.value = values[0];
      this.highValue = values[1];
      this.updateThumbPositionOnInit();
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {}

  onChange: any = () => {};

  onTouch: any = () => {};

  onMouseDown(event: MouseEvent) {
    this.isMovingThumb = true;
    const sliderTrack = this.el.nativeElement;
    const trackRect = sliderTrack.getBoundingClientRect();
    const clickPosition = event.pageX - trackRect.left;

    if (this.highValue) {
      const thumbPositions = this.thumbPositions.map((position) =>
        Math.abs(position - clickPosition),
      );
      const closestThumbIndex = thumbPositions.indexOf(Math.min(...thumbPositions));
      this.updateThumbPosition(closestThumbIndex, event.pageX);
      this.thumbIndex = closestThumbIndex;
    } else {
      this.updateThumbPosition(0, event.pageX);
      this.thumbIndex = 0;
    }
  }

  @HostListener('document:mouseup')
  onMouseUp(): void {
    this.isMovingThumb = false;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.isMovingThumb) {
      const thumbIndex = this.highValue ? (this.thumbIndex as number) : 0;
      let horizontalDirection;
      if (event.pageX < this.oldX) {
        horizontalDirection = 'left';
      }
      if (event.pageX > this.oldX) {
        horizontalDirection = 'right';
      }
      this.oldX = event.pageX;
      this.updateThumbPosition(thumbIndex, event.pageX, horizontalDirection as 'left' | 'right');
    }
  }

  ngOnInit(): void {
    this.updateThumbPositionOnInit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['min']?.currentValue && !changes['value']?.currentValue) {
      this.value = changes['min'].currentValue;
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.toggleLabel();
    });
  }

  updateThumbPosition(index: number, pageX: number, horizontalDirection?: 'left' | 'right'): void {
    this.toggleLabel();
    const sliderTrack = this.el.nativeElement;
    const trackRect = sliderTrack.getBoundingClientRect();
    const trackWidth = trackRect.width;
    const stepRatio = this.step / (this.max - this.min);
    const pixelStep = trackWidth * stepRatio;
    const newPosition = pageX - trackRect.left;
    const closestStep = Math.round(newPosition / pixelStep);
    const snappedPosition = closestStep * pixelStep;

    if (
      this.thumbPositions[0] === this.thumbPositions[1] ||
      this.thumbPositions[0] > this.thumbPositions[1]
    ) {
      this.thumbPositions[index] = this.thumbPositions.find((position, idx) => idx !== index)!;
      this.thumbPositions[horizontalDirection === 'left' ? 0 : 1] = Math.max(
        0,
        Math.min(snappedPosition, trackRect.width),
      );
      this.thumbIndex = horizontalDirection === 'left' ? 0 : 1;
      this.emitValues();
      return;
    }

    this.thumbPositions[index] = Math.max(0, Math.min(snappedPosition, trackRect.width));
    this.emitValues();
  }

  updateThumbPositionOnInit(): void {
    const sliderTrack = this.el.nativeElement;
    const trackRect = sliderTrack.getBoundingClientRect();
    const trackWidth = trackRect.width;
    const range = this.max - this.min;
    const stepRatio = this.step / range;
    const pixelStep = trackWidth * stepRatio;
    const valueRatio = (this.value - this.min) / range;
    const valuePosition = Math.round(valueRatio * trackWidth);
    const numSteps = Math.round(valuePosition / pixelStep);
    const newValuePosition = numSteps * pixelStep;
    this.thumbPositions = [newValuePosition];

    if (this.highValue) {
      const highValueRatio = (this.highValue - this.min) / range;
      const highValuePosition = Math.round(highValueRatio * trackWidth);
      const highNumSteps = Math.round(highValuePosition / pixelStep);
      const newHighValuePosition = highNumSteps * pixelStep;
      this.thumbPositions.push(newHighValuePosition);
    }

    this.emitValues();
  }

  emitValues(): void {
    const sliderTrack = this.el.nativeElement;
    const trackRect = sliderTrack.getBoundingClientRect();
    const trackWidth = trackRect.width;
    const range = this.max - this.min;
    const valueRatio = this.thumbPositions[0] / trackWidth;
    const value = Math.round(valueRatio * range + this.min);
    this.values = [value];

    if (this.highValue) {
      const highValueRatio = this.thumbPositions[1] / trackWidth;
      const highValue = Math.round(highValueRatio * range + this.min);
      this.values.push(highValue);
    }

    this.valueChange.emit(this.values);
    this.onChange(this.values);
  }

  isElementInElement(firstElement: HTMLElement, secondElement: HTMLElement) {
    const firstElRect = firstElement?.getBoundingClientRect();
    const secondElRect = secondElement?.getBoundingClientRect();
    return (
      firstElRect.right >= secondElRect.left &&
      firstElRect.left <= secondElRect.right &&
      firstElRect.bottom >= secondElRect.top &&
      firstElRect.top <= secondElRect.bottom
    );
  }

  toggleLabel() {
    const isThumb1InsideMinLabel = this.isElementInElement(
      this.thumbLabels.get(0)?.nativeElement,
      this.minValueLabel.nativeElement,
    );
    const isThumb1InsideMaxLabel = this.isElementInElement(
      this.thumbLabels.get(0)?.nativeElement,
      this.maxValueLabel.nativeElement,
    );
    const isThumb2InsideMaxLabel =
      this.thumbLabels.get(1)?.nativeElement &&
      this.isElementInElement(
        this.thumbLabels.get(1)?.nativeElement,
        this.maxValueLabel.nativeElement,
      );

    this.isLabelOverlap =
      this.thumbLabels.get(1)?.nativeElement &&
      this.isElementInElement(
        this.thumbLabels.get(0)?.nativeElement,
        this.thumbLabels.get(1)?.nativeElement,
      );

    this.renderer.setStyle(
      this.minValueLabel.nativeElement,
      'opacity',
      isThumb1InsideMinLabel ? 0 : 1,
    );
    this.renderer.setStyle(
      this.maxValueLabel.nativeElement,
      'opacity',
      isThumb1InsideMaxLabel || isThumb2InsideMaxLabel ? 0 : 1,
    );
  }
}
