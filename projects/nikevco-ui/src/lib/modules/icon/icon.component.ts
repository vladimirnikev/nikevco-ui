import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NikevCoIconService } from './icon.service';

@Component({
  selector: 'nikevco-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css'],
})
export class IconComponent implements OnInit, OnDestroy {
  private sub = new Subscription();

  public icon!: string;

  @Input() src!: string;

  @Input() width!: number;

  @Input() height!: number;

  constructor(private iconService: NikevCoIconService) {}

  ngOnInit(): void {
    this.sub.add(
      this.iconService.loadSvg(this.src).subscribe((data) => {
        this.icon = data;
        if (this.width) {
          this.icon = this.icon.replace(/width="\d+px"/g, `width="${this.width}px"`);
        }

        if (this.height) {
          this.icon = this.icon.replace(/height="\d+px"/g, `height="${this.height}px"`);
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
