import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { CalypsoIconComponent } from "./icon.component";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [MatIconModule, CommonModule],
  declarations: [CalypsoIconComponent],
  exports: [CalypsoIconComponent],
})
export class CalypsoIconModule {}
