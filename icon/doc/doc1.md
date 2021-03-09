```js script
import './styles.css';
import { CalypsoIconModule } from "../dist/icon.module";
import bootstrap from "../../bootstrap/dist/index";
import "../../doc-components/dist/story-select";

bootstrap.args.imports = [CalypsoIconModule];
export default bootstrap;
```

```html preview-story
<!-- "storyName": "Icon Demo" -->
<div class="title">Calypso Icons</div>
<div>
    <div class="subtitle">Theme colors</div>
    <cal-icon icon="icon-pin" color="no-color"></cal-icon>
    <cal-icon icon="icon-pin" color="primary"></cal-icon>
    <cal-icon icon="icon-pin" color="secondary"></cal-icon>
    <cal-icon icon="icon-pin" color="error"></cal-icon>
    <cal-icon icon="icon-pin" color="success"></cal-icon>

    <div class="subtitle">Custom colors</div>
    <cal-icon icon="icon-pin" iconClass="custom-color-1"></cal-icon>
    <cal-icon icon="icon-pin" iconClass="custom-color-2"></cal-icon>
    <cal-icon icon="icon-pin" iconClass="custom-color-3"></cal-icon>

    <div class="subtitle">Material icon component with custom colors</div>
    <mat-icon svgIcon="icon-pin" class="material-icon-1"></mat-icon>
    <mat-icon svgIcon="icon-pin" class="material-icon-2"></mat-icon>
    <mat-icon svgIcon="icon-pin" class="material-icon-3"></mat-icon>

    <div class="subtitle">Different sizes</div>
    <cal-icon icon="icon-pin" size="12"></cal-icon>
    <cal-icon icon="icon-pin" size="24"></cal-icon>
    <cal-icon icon="icon-pin" size="48"></cal-icon>
</div>
```