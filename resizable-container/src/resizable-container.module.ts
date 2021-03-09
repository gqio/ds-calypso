import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CalypsoIconModule } from "../../icon";
import { CalypsoResizableContainerComponent } from "./resizable-container.component";

@NgModule({
  imports: [CalypsoIconModule, CommonModule],
  declarations: [CalypsoResizableContainerComponent],
  exports: [CalypsoResizableContainerComponent],
})
export class CalypsoResizableContainerModule {}
