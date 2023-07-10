import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-autocomplete-page',
  templateUrl: './autocomplete-page.component.html',
  styleUrls: ['./autocomplete-page.component.scss'],
})
export class AutocompletePageComponent implements OnInit {
  model: any;

  optionGroups = [
    { label: 'A', values: ['Apple'] },
    { label: 'S', values: ['Samsung'] },
  ];

  ngOnInit(): void {
    setTimeout(() => {
      const newBrand = { label: 'G', values: ['Gygabite'] };
      this.optionGroups.push(newBrand);
    }, 5000);
  }

  modelChange(event: any) {
    console.log(event);
  }
}
