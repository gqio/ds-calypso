```js script
import "./styles.scss";
import { component, componentDemo } from "./doc.data";
import { CalypsoResizableContainerModule } from "../dist/resizable-container.module";
import bootstrap from "../../bootstrap/dist/index";
import "../../doc-components/dist/story-select";

bootstrap.component = componentDemo;
bootstrap.args.imports = [CalypsoResizableContainerModule];
export default bootstrap;
```

# ResizableContainerComponent

A custom Calypso component that acts as a container which allows the user to increase or decrease its size by dragging one if its sides.

You can use the ResizableContainerComponent in your application by adding its selector in your HTML code and importing CalypsoResizableContainerModule:

```html
<cal-resizable-container [vertical]="true" [horizontal]="false">
  <!-- CONTENT HERE -->
</cal-resizable-container>
```

## Samples

<!-- Comment/UnComment this component story-select to show/hide a story selector -->
<!-- the selector attribute is defaulted to selector="[data-story-id]" but you can use any dom selector  -->

<story-select selector="[data-story-id]"></story-select>

```js story
export const vertical = () => component("./_vertical.html");
```

```js story
export const toggleMode = () => component("./_toggle-mode.html");
```

```js preview-story
export const horizontal = () => component("./_horizontal.html");
```

```js story
export const horizontalFlex = () => component("./_horizontal-flex.html");
```

```html preview-story
<!-- "storyName": "Vertical Story" -->
<div class="demo demo3">
  <h3 class="demo-title">Highest European points</h3>
  <div class="horizontal-flex-demo">
    <cal-resizable-container [horizontal]="true" [vertical]="false">
      <div class="white-bkg">
        <mat-table class="cal-table" [dataSource]="dataSource1">
          <ng-container matColumnDef="name">
            <mat-header-cell *matHeaderCellDef> Name </mat-header-cell>
            <mat-cell *matCellDef="let element"> {{ element.name }} </mat-cell>
          </ng-container>
          <ng-container matColumnDef="height">
            <mat-header-cell *matHeaderCellDef> Height </mat-header-cell>
            <mat-cell *matCellDef="let element">
              {{ element.height }}
            </mat-cell>
          </ng-container>
          <ng-container matColumnDef="country">
            <mat-header-cell *matHeaderCellDef> Country </mat-header-cell>
            <mat-cell *matCellDef="let element">
              {{ element.country }}
            </mat-cell>
          </ng-container>

          <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
          <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
        </mat-table>
      </div>
    </cal-resizable-container>

    <div class="boxes">
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
    </div>
  </div>
</div>
```
