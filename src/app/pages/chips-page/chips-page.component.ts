import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chips-page',
  templateUrl: './chips-page.component.html',
  styleUrls: ['./chips-page.component.scss'],
})
export class ChipsPageComponent implements OnInit, OnDestroy {
  private sub = new Subscription();

  commonChipValue = 'first';

  formControl!: FormControl;

  constructor(private fb: FormBuilder) {
    this.formControl = fb.control('first_chip');
  }

  ngOnInit(): void {
    this.sub.add(
      this.formControl?.valueChanges.subscribe((v) => console.log('Form Control Changed: ', v)),
    );

    setTimeout(() => {
      this.commonChipValue = 'second';
      this.formControl.setValue('second_chip');
    }, 3000);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onModelChange(value: any) {
    console.log(value);
  }

  onValueChange(value: any) {
    console.log('onValueChange: ', value);
  }
}
