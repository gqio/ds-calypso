import { FlexLayoutModule } from "@angular/flex-layout";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatRadioModule } from "@angular/material/radio";
import { BrowserModule } from "@angular/platform-browser";
import { TranslateModule } from "@ngx-translate/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";

export default [
  BrowserModule,
  HttpClientModule,
  FlexLayoutModule,
  BrowserAnimationsModule,
  TranslateModule.forRoot({
    defaultLanguage: "en",
  }),
  MatProgressBarModule,
  MatSnackBarModule,
  MatTableModule,
  MatPaginatorModule,
  MatToolbarModule,
  MatSelectModule,
  MatCheckboxModule,
  MatDialogModule,
  MatIconModule,
  MatRadioModule,
  MatSlideToggleModule,
  MatTabsModule,
  MatInputModule,
];
