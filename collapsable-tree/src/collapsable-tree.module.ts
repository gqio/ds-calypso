import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { CalypsoCheckboxModule } from "../../checkbox";
import { CalypsoButtonModule } from "../../button";
import { CalypsoAccordionModule } from "../../accordion";
import { CalypsoCollapsableTreeComponent } from "./collapsable-tree.component";

@NgModule({
  imports: [
    CalypsoAccordionModule,
    MatIconModule,
    CalypsoButtonModule,
    CalypsoCheckboxModule,
    CommonModule,
  ],
  declarations: [CalypsoCollapsableTreeComponent],
  exports: [CalypsoCollapsableTreeComponent],
})
export class CalypsoCollapsableTreeModule {}
