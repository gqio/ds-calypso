import { Input, Component, EventEmitter, Output, OnChanges } from '@angular/core';

@Component({
    selector: 'cal-progress-bar',
    templateUrl: '/progress-bar.component.html',
})
 export class CalypsoProgressBarComponent implements OnChanges {

      @Input('loading') loading: boolean = false;
      public finishedLoading: boolean = false;

      ngOnChanges(changes): void {
        if (changes['loading'] && !changes['loading'].firstChange && !changes['loading'].currentValue) {
            // finished loading...
            this.finishedLoading = true;
            setTimeout(() => this.finishedLoading = false, 3000);
        }
    }
}