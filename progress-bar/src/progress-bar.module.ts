import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CalypsoProgressBarComponent } from './progress-bar.component';

@NgModule({
  declarations: [CalypsoProgressBarComponent],
  imports: [MatProgressBarModule],
  exports: [CalypsoProgressBarComponent]
})
export class CalypsoProgressBarModule {}