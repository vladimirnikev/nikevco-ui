import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-fields-page',
  templateUrl: './form-fields-page.component.html',
  styleUrls: ['./form-fields-page.component.scss'],
})
export class FormFieldsPageComponent implements OnInit, OnDestroy {
  private sub = new Subscription();

  isError = false;

  constructor(private fb: FormBuilder) {}

  superheroModel = 'Superman';

  name = this.fb.control('');

  ngOnInit(): void {
    setTimeout(() => {
      this.isError = true;
      this.superheroModel = 'Batman';
    }, 3000);

    this.sub.add(this.name.valueChanges.subscribe((v) => console.log(v)));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onSelect(value: any) {
    console.log(value);
  }
}
