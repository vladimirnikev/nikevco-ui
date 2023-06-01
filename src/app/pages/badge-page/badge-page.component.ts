import { Component, OnInit } from '@angular/core';
import { TColor } from 'dist/nikevco-ui/lib/common/color.type';
import { TBadgePosition } from 'projects/nikevco-ui/src/lib/common/badge-position.type';
import { TBadgeSize } from 'projects/nikevco-ui/src/lib/common/badge-size.type';

@Component({
  selector: 'app-badge-page',
  templateUrl: './badge-page.component.html',
  styleUrls: ['./badge-page.component.scss'],
})
export class BadgePageComponent implements OnInit {
  badgeValue = 8;

  badgeColor: TColor = 'secondary';

  badgeSize: TBadgeSize = 'small';

  badgePosition: TBadgePosition = 'after above';

  badgeOverlapping = true;

  badgeHidden = false;

  ngOnInit(): void {
    setTimeout(() => {
      this.badgeValue = 38;
    }, 1000);

    setTimeout(() => {
      this.badgeColor = 'primary';
    }, 2000);

    setTimeout(() => {
      this.badgeSize = 'large';
    }, 3000);

    setTimeout(() => {
      this.badgePosition = 'before below';
    }, 4000);

    setTimeout(() => {
      this.badgeOverlapping = false;
    }, 5000);

    setTimeout(() => {
      this.badgeHidden = true;
    }, 6000);
  }

  changeValue() {
    this.badgeValue = this.badgeValue + 2;
    console.log(this.badgeValue);
  }

  changeColor() {
    this.badgeColor = 'success';
  }

  changeSize() {
    this.badgeSize = 'small';
  }

  changePosition() {
    this.badgePosition = 'after below';
  }

  changeOverlapping() {
    this.badgeOverlapping = true;
  }

  changeHidden() {
    this.badgeHidden = false;
  }
}
