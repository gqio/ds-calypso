import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatIconModule } from "@angular/material/icon";
import { CalypsoCheckboxModule } from "../../checkbox";
import { SearchHistoryService } from "./search-input.service";
import { CalypsoSearchInputComponent } from "./search-input.component";

@NgModule({
  imports: [
    MatIconModule,
    CalypsoCheckboxModule,
    FormsModule,
    MatAutocompleteModule,
    CommonModule,
  ],
  declarations: [CalypsoSearchInputComponent],
  exports: [CalypsoSearchInputComponent],
  providers: [SearchHistoryService],
})
export class CalypsoSearchInputModule {}
