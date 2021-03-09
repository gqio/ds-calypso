# Calypso DS

```js script
import { html } from "lit-html"; // bare import automatically resolved and bundled
import "https://platform.twitter.com/widgets.js"; // normal http imports
import "../../styles/dist/main.css"; // Import styles as global with generated loader
import "./style.scss"; // import scss or css
const img =
  "https://www2.calypso.com/Portals/0/Images/Calypso-logo-2015.png?ver=2019-01-07-142700-000";
```

- a standard JS story

```js story
// Regular story
export const Doc = () => `
  <div style="display:flex;justify-content:space-between">
  <a class="mat-link" href="${window.parent.location.href.replace(
    /\/ds\//,
    "/doc/"
  )}" target="_parent">Go to Doc</a>
  <a class="mat-link" href="${window.parent.location.href.replace(
    /\/doc\//,
    "/ds/"
  )}" target="_parent">Go to Edit</a>`;
```

- a JS story with code

```js preview-story
export const story1 = () => html`${new Date()}`;
```

- a html story

<!-- if you need to use variables defined in scripts, you can also name your story -->

```html:html preview-story
<!--"storyName":"Calypso Image"-->
<img src="${img}" />
```

- a templated html, but not a story

```html:html
<img src="${img}" />
```

- regular html
  <a class="twitter-timeline" href="https://twitter.com/CalypsoTech"></a>
