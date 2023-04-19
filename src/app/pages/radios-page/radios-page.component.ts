import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-radios-page',
  templateUrl: './radios-page.component.html',
  styleUrls: ['./radios-page.component.scss'],
})
export class RadiosPageComponent {
  colors = [
    { name: 'Red', value: 'red' },
    { name: 'Blue', value: 'blue' },
    { name: 'Yellow', value: 'yellow' },
  ];

  selectedColorControl = this.fb.control(this.colors[1].value);

  brands = [
    { name: 'Apple', value: 'apple' },
    { name: 'Samsung', value: 'samsung' },
    { name: 'Huawei', value: 'huawei' },
  ];

  selectedBrand = this.brands[0].value;

  selectedContent = 'first';

  constructor(private fb: FormBuilder) {}
}
