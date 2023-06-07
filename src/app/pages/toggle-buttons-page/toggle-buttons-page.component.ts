import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toggle-buttons-page',
  templateUrl: './toggle-buttons-page.component.html',
  styleUrls: ['./toggle-buttons-page.component.scss'],
})
export class ToggleButtonsPageComponent implements OnInit, OnDestroy {
  private sub = new Subscription();

  isDisabled = true;

  club = new FormControl('Arsenal');

  teamPurposes: string[] = ['Clevelend'];

  ngOnInit(): void {
    this.sub.add(this.club.valueChanges.subscribe((v) => console.log('Form control value: ', v)));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onChange(value: any) {
    console.log(value);
  }

  onModelChange(value: any) {
    console.log('Model value: ', value);
  }
}
