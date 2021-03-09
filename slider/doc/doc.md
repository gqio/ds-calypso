```js script
import bootstrap from "../../bootstrap";
import { CalypsoSliderModule } from "../dist/index";
bootstrap.component = class AppComponent {};
bootstrap.args.imports = [CalypsoSliderModule];
export default bootstrap;
```

# Slider

```html preview-story
<!--  "exportName" : "Basic" -->
<mat-slider min="1" max="123" step="1" value="50"></mat-slider>
```

```js story
export const story1 = () => `
<mat-slider
  thumbLabel
  [displayWith]="formatLabel"
  tickInterval="1000"
  min="1"
  max="100"></mat-slider>`;
story1.component = class {
  formatLabel(value) {
    if (value >= 1000) return Math.round(value / 1000) + "k";
    return value;
  }
};
story1.args = { styles: [`mat-slider { width: 300px; }`] };
```
