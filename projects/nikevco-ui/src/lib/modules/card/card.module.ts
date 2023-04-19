import { NgModule } from '@angular/core';
import { CardComponent } from './components/card/card.component';
import { CardHeaderComponent } from './components/card-header/card-header.component';
import { CardContentComponent } from './components/card-content/card-content.component';
import { CardActionsComponent } from './components/card-actions/card-actions.component';
import { CardTitleComponent } from './components/card-title/card-title.component';
import { CardFooterComponent } from './components/card-footer/card-footer.component';

@NgModule({
  declarations: [
    CardComponent,
    CardHeaderComponent,
    CardContentComponent,
    CardActionsComponent,
    CardTitleComponent,
    CardFooterComponent,
  ],
  exports: [
    CardComponent,
    CardHeaderComponent,
    CardContentComponent,
    CardActionsComponent,
    CardTitleComponent,
    CardFooterComponent,
  ],
})
export class NikevCoCardModule {}
