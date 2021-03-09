import "core-js/proposals/reflect-metadata"; // reflection for DI
import "zone.js/dist/zone"; // used for change detection
import "../../styles/dist/main.css";
import dependencies from "./dependencies";
import { NgModule, enableProdMode, Component } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

enableProdMode();

const withAppModule = (story, context) => {
  context.args.theme &&
    document.body.classList.add(context.args.theme + "-theme");
    
    document.body.classList.add("markdown-body")
  let storyComponent = story();
  if (typeof storyComponent === "string") {
    let contextComponentClass = context.component;
    if (!contextComponentClass) {
      class contextComponent {}
      contextComponentClass = contextComponent;
    }
    @Component({ template: storyComponent, styles: context.args.styles })
    class componentClass extends contextComponentClass {}
    storyComponent = componentClass;
  }
  if (storyComponent.__annotations__) {
    storyComponent.__annotations__[0].selector = `[data-story-id=${context.args.storyId}]`;
    const {
      imports = [],
      declarations = [],
      bootstrap = [],
      providers = [],
      schemas = [],
    } = context.args;
    @NgModule({
      imports: [...dependencies, ...imports],
      declarations: [...declarations, storyComponent],
      bootstrap: [...bootstrap, storyComponent],
      providers,
      schemas,
    })
    class AppModule {}
    requestAnimationFrame(() =>
      platformBrowserDynamic().bootstrapModule(AppModule)
    );
    return `<i>Mounting...</i>`;
  }
  return storyComponent;
};

export default {
  decorators: [withAppModule],
  args: { theme: "blue" }
};
