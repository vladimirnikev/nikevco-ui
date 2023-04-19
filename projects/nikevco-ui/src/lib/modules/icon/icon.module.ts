import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IconComponent } from './icon.component';
import { NikevCoIconService } from './icon.service';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';

@NgModule({
  providers: [NikevCoIconService],
  declarations: [IconComponent, SafeHtmlPipe],
  imports: [CommonModule, HttpClientModule],
  exports: [IconComponent],
})
export class NikevCoIconModule {}
