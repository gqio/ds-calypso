import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CovalentExpansionPanelModule } from "@covalent/core/expansion-panel";
import { CalypsoAccordionComponent } from "./accordion.component";

@NgModule({
  imports: [CommonModule, CovalentExpansionPanelModule],
  providers: [],
  declarations: [CalypsoAccordionComponent],
  exports: [CalypsoAccordionComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class CalypsoAccordionModule {}
