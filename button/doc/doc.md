```js script
import "./doc.css";
import bootstrap from "../../bootstrap";
import { CalypsoButtonModule } from "../dist/index";
bootstrap.args.imports = [CalypsoButtonModule];
export default bootstrap;
```

# Button

### Basic

```html preview-story
<!-- "storyName" : "Basic" -->
<button mat-button>Basic</button>
<button mat-button color="primary">Primary</button>
<button mat-button color="accent">Accent</button>
<button mat-button color="warn">Warn</button>
<button mat-button disabled>Disabled</button>
<a mat-button href="https://www.google.com/" target="_blank">Link</a>
```

### Raised

```html preview-story
<!-- "storyName" : "Raised" -->
<!-- "exportName" : "toto" -->
<button mat-raised-button>Basic</button>
<button mat-raised-button color="primary">Primary</button>
<button mat-raised-button color="accent">Accent</button>
<button mat-raised-button color="warn">Warn</button>
<button mat-raised-button disabled>Disabled</button>
<a mat-raised-button href="https://www.google.com/" target="_blank">Link</a>
```

### Stroked

```html preview-story
<!-- "exportName" : "Stroked" -->
<button mat-stroked-button>Basic</button>
<button mat-stroked-button color="primary">Primary</button>
<button mat-stroked-button color="accent">Accent</button>
<button mat-stroked-button color="warn">Warn</button>
<button mat-stroked-button disabled>Disabled</button>
<a mat-stroked-button href="https://www.google.com/" target="_blank">Link</a>
```

### Flat

```html preview-story
<!-- "exportName" : "Flat" -->
<button mat-flat-button>Basic</button>
<button mat-flat-button color="primary">Primary</button>
<button mat-flat-button color="accent">Accent</button>
<button mat-flat-button color="warn">Warn</button>
<button mat-flat-button disabled>Disabled</button>
<a mat-flat-button href="https://www.google.com/" target="_blank">Link</a>
```

### Icon

```html preview-story
<!-- "exportName" : "Icon" -->
<button
  mat-icon-button
  aria-label="Example icon button with a vertical three dot icon"
>
  <mat-icon>more_vert</mat-icon>
</button>
<button
  mat-icon-button
  color="primary"
  aria-label="Example icon button with a home icon"
>
  <mat-icon>home</mat-icon>
</button>
<button
  mat-icon-button
  color="accent"
  aria-label="Example icon button with a menu icon"
>
  <mat-icon>menu</mat-icon>
</button>
<button
  mat-icon-button
  color="warn"
  aria-label="Example icon button with a heart icon"
>
  <mat-icon>favorite</mat-icon>
</button>
<button
  mat-icon-button
  disabled
  aria-label="Example icon button with a open in new tab icon"
>
  <mat-icon>open_in_new</mat-icon>
</button>
```

### FAB

```html preview-story
<!-- "exportName" : "FAB" -->
<button
  mat-fab
  color="primary"
  aria-label="Example icon button with a delete icon"
>
  <mat-icon>delete</mat-icon>
</button>
<button
  mat-fab
  color="accent"
  aria-label="Example icon button with a bookmark icon"
>
  <mat-icon>bookmark</mat-icon>
</button>
<button mat-fab color="warn" aria-label="Example icon button with a home icon">
  <mat-icon>home</mat-icon>
</button>
<button mat-fab disabled aria-label="Example icon button with a heart icon">
  <mat-icon>favorite</mat-icon>
</button>
```

### Mini FAB<

```html preview-story
<!-- "exportName" : "MiniFAB" -->
<button
  mat-mini-fab
  color="primary"
  aria-label="Example icon button with a menu icon"
>
  <mat-icon>menu</mat-icon>
</button>
<button
  mat-mini-fab
  color="accent"
  aria-label="Example icon button with a plus one icon"
>
  <mat-icon>plus_one</mat-icon>
</button>
<button
  mat-mini-fab
  color="warn"
  aria-label="Example icon button with a filter list icon"
>
  <mat-icon>filter_list</mat-icon>
</button>
<button mat-mini-fab disabled aria-label="Example icon button with a home icon">
  <mat-icon>home</mat-icon>
</button>
```
