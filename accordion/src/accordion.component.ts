import { Component, Input } from "@angular/core";

@Component({
  selector: "cal-accordion",
  templateUrl: "accordion.component.html",
  styleUrls: ["accordion.css"],
})
export class CalypsoAccordionComponent {
  @Input("expand") expand: boolean;
}
