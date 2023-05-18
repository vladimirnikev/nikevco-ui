import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider-page',
  templateUrl: './slider-page.component.html',
  styleUrls: ['./slider-page.component.scss'],
})
export class SliderPageComponent implements OnInit {
  min = 100;

  max = 1000;

  step = 1;

  value = 10;

  constructor() {}

  ngOnInit(): void {
    // setInterval(() => {
    // this.value = this.value + 10;
    // console.log(this.value)
    // }, 1000)
  }

  onChange() {
    console.log(this.value);
  }
}
