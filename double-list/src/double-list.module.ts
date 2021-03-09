import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { CalypsoButtonModule } from "../../button";
import { CalypsoSearchInputModule } from "../../search-input";
import { CalypsoDoubleListComponent } from "./double-list.component";

@NgModule({
  imports: [
    MatListModule,
    MatIconModule,
    CalypsoButtonModule,
    CalypsoSearchInputModule,
    CommonModule,
  ],
  declarations: [CalypsoDoubleListComponent],
  exports: [CalypsoDoubleListComponent],
})
export class CalypsoDoubleListModule {}
