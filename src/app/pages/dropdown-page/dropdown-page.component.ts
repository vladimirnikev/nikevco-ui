import { Component } from '@angular/core';

@Component({
  selector: 'app-dropdown-page',
  templateUrl: './dropdown-page.component.html',
  styleUrls: ['./dropdown-page.component.scss'],
})
export class DropdownPageComponent {
  onClick() {
    console.log('Clicked');
  }
}
