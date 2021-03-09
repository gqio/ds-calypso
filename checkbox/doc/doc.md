```js script
import bootstrap from "../../bootstrap";
import "./doc.css";
import { CalypsoCheckboxModule } from "../dist/index";
import { FormsModule } from "@angular/forms";
import { CheckboxOverviewExample } from "./doc";
bootstrap.component = CheckboxOverviewExample;
bootstrap.args.imports = [CalypsoCheckboxModule, FormsModule];
export default bootstrap;
```

```html preview-story
<mat-checkbox class="example-margin">Check me!</mat-checkbox>
<mat-checkbox class="example-margin" [disabled]="true">Disabled</mat-checkbox>
```

```html preview-story
<span class="example-list-section">
  <mat-checkbox
    class="example-margin"
    [checked]="allComplete"
    [indeterminate]="someComplete()"
    (change)="setAll($event.checked)"
  >
    {{task.name}}
  </mat-checkbox>
</span>
<span class="example-list-section">
  <ul>
    <li *ngFor="let subtask of task.subtasks">
      <mat-checkbox
        [(ngModel)]="subtask.completed"
        [color]="subtask.color"
        (ngModelChange)="updateAllComplete()"
      >
        {{subtask.name}}
      </mat-checkbox>
    </li>
  </ul>
</span>
```
