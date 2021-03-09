```js script
import { ReactiveFormsModule } from "@angular/forms";
import { CalypsoDoubleListModule } from "../dist/double-list.module";
import { DoubleListDemoComponent } from "./double-list-demo.component";
import bootstrap from "../../bootstrap";

bootstrap.args.imports = [ReactiveFormsModule, CalypsoDoubleListModule];
export default bootstrap;
```

# DoubleListComponent

A custom Calypso component allows the user to select elements from a list.
You can use the DoubleListComponent in your application by adding its selector in your HTML code and importing the CalypsoDoubleListModule:

```html
<cal-double-list [items]="availableItems"> </cal-double-list>
```

## Playground

```js story
export const DoubleListDemo = () => DoubleListDemoComponent;
```
