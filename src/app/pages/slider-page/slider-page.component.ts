import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-slider-page',
  templateUrl: './slider-page.component.html',
  styleUrls: ['./slider-page.component.scss'],
})
export class SliderPageComponent {
  min = 100;

  max = 1000;

  step = 1;

  value = 10;

  sliderValue = [0, 10];

  modelValue = [1000, 3000];

  formControl = this.fb.control([1000, 4000]);

  constructor(private fb: FormBuilder) {}

  onChangeSingleValue(value: number[]) {
    console.log(value);
  }

  onChangeRangeValue(value: number[]) {
    console.log(value);
  }
}
