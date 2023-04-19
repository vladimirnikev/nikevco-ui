import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'nikevco-workspace';

  color: 'primary' | 'secondary' = 'primary';

  setSecondary() {
    this.color = 'secondary';
  }
}
