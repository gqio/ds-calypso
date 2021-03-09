import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatListModule } from "@angular/material/list";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { CalypsoCheckboxModule } from "../../checkbox";
import { CalypsoAccordionModule } from "../../accordion";
import { CalypsoCollapsableTreeModule } from "../../collapsable-tree";
import { CalypsoAutocompleteMultiSelectComponent } from "./autocomplete-multi-select.component";

@NgModule({
  imports: [
    CalypsoAccordionModule,
    CalypsoCollapsableTreeModule,
    MatListModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    MatMenuModule,
    CalypsoCheckboxModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    TranslateModule,
  ],
  declarations: [CalypsoAutocompleteMultiSelectComponent],
  exports: [CalypsoAutocompleteMultiSelectComponent],
})
export class CalypsoAutocompleteMultiSelectModule {}
