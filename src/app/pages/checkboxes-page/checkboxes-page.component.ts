import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-checkboxes-page',
  templateUrl: './checkboxes-page.component.html',
  styleUrls: ['./checkboxes-page.component.scss'],
})
export class CheckboxesPageComponent implements OnInit, OnDestroy {
  sub = new Subscription();

  pizza = {
    name: 'Indeterminate',
    allChecked: false,
    ingridients: [
      { name: 'Tomato', checked: false },
      { name: 'Chicken', checked: false },
      { name: 'Cheese', checked: false },
    ],
  };

  gymMembership = this.fb.group({
    allInclusive: [false],
    bonuses: this.fb.group({
      spa: [false, Validators.requiredTrue],
      massage: [false],
    }),
  });

  requiredCheckbox = this.fb.control(false, Validators.requiredTrue);

  isChecked = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.sub.add(
      this.gymMembershipAllInclusive.valueChanges.subscribe((value) => this.setAllBonuses(value)),
    );

    this.sub.add(
      this.gymMembershipBonuses.valueChanges.subscribe(() => this.updateAllBonusesChecked()),
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  toggleCheckbox() {
    this.isChecked = !this.isChecked;
  }

  submitFormExample() {
    this.requiredCheckbox.markAllAsTouched();
    console.log(this.requiredCheckbox.value);
  }

  // Example for Common Forms
  setAllIngridients(event: any) {
    this.pizza.allChecked = event;
    this.pizza.ingridients = this.pizza.ingridients.map((ingridient) => ({
      ...ingridient,
      checked: event,
    }));
  }

  someCheckedIngridients() {
    return (
      this.pizza.ingridients.some((ingridient) => ingridient.checked) && !this.pizza.allChecked
    );
  }

  updateAllIngridientsChecked() {
    this.pizza.allChecked = this.pizza.ingridients.every((ingridient) => ingridient.checked);
  }

  // Example for Reactive Forms
  setAllBonuses(event: any) {
    this.gymMembershipBonuses.patchValue(
      {
        spa: event,
        massage: event,
      },
      { emitEvent: false },
    );
  }

  someCheckedBonuses() {
    return (
      Object.values(this.gymMembershipBonuses.value).some((bonus) => bonus) &&
      !this.gymMembershipAllInclusive.value
    );
  }

  updateAllBonusesChecked() {
    this.gymMembershipAllInclusive.patchValue(
      Object.values(this.gymMembershipBonuses.value).every((bonus) => bonus),
      { emitEvent: false },
    );
  }

  get gymMembershipAllInclusive() {
    return this.gymMembership.get('allInclusive')!;
  }

  get gymMembershipBonuses() {
    return this.gymMembership.get('bonuses')!;
  }
}
