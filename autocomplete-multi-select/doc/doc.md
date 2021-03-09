```js script
import { ReactiveFormsModule } from "@angular/forms";
import { CalypsoAutocompleteMultiSelectModule } from "../dist/autocomplete-multi-select.module";
import { AutocompleteMultiSelectDemoComponent } from "./autocomplete-multi-select.demo";
import bootstrap from "../../bootstrap";

bootstrap.args.imports = [
  ReactiveFormsModule,
  CalypsoAutocompleteMultiSelectModule,
];
export default bootstrap;
```

# AutocompleteMultiSelectComponent

A custom Calypso component that allows the user to filter and select items from a list.
You can use the AutocompleteMultiSelectComponent in your application by adding its selector in your HTML code and importing CalypsoAutocompleteMultiSelectComponent:

```html
<cal-autocomplete-multi-select [items]="items" [selectedItems]="selected">
</cal-autocomplete-multi-select>
```

## Options:

- `allowNew`: whether to allow items that are not available within the deafult options, by default is false.
- `chips`: true to show the selected items as chips. Default is `false`.
- `treeView`: whether to show the items as a tree. Default is `false`.
  Each treeview item can have:

  - `children`: collection of descendants
  - `disable`: disables the item selection

  When using treeView=true it is also possible to specify `singleSelection=true|false` to allow for multiple selection of items.

  - `longText`: when using text (not chips) displays the selected items as a list of comma separated values. Default is false.

```js story
export const AutocompleteMultiSelectDemo = () =>
  AutocompleteMultiSelectDemoComponent;
```
