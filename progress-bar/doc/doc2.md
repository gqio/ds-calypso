```js script
import bootstrap from "../../bootstrap/dist/index";
import "../../doc-components/dist/story-select";
import { CalypsoProgressBarModule } from "../dist/progress-bar.module";

bootstrap.args.imports = [CalypsoProgressBarModule];
export default bootstrap;
```

```html preview-story
<cal-progress-bar></cal-progress-bar>
```