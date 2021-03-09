import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { SearchHistoryService } from "./search-input.service";
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material/icon";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

export interface CalypsoSearchInputOption {
  label: string;
  selected: boolean;
}

@Component({
  selector: "cal-search-input",
  templateUrl: "search-input.component.html",
  styleUrls: ["search-input.css"],
})
export class CalypsoSearchInputComponent implements OnInit {
  private options = [];
  @Input() placeholder: string = "Search";
  @Input() history: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() option: CalypsoSearchInputOption;
  @Input() debounce: number = 0;
  @Output() onSearch = new EventEmitter();
  @Output() onKeyUp = new EventEmitter();
  @Output() onOptionChange = new EventEmitter<boolean>();
  @Output() searchTermChange = new EventEmitter<string>();
  @Input()
  get searchTerm(): string {
    return this.query;
  }

  set searchTerm(value: string) {
    this.query = value;
    this.searchTermChange.emit(this.query);
  }

  @ViewChild("searchInput", { static: false }) searchInput: ElementRef;

  filteredOptions: string[] = [];
  query: string;

  private modelChanged: Subject<string> = new Subject<string>();

  constructor(
    private historyService: SearchHistoryService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    this.iconRegistry.addSvgIcon(
      "icon-recent",
      this.sanitizer.bypassSecurityTrustResourceUrl("icons/icon-recent.svg")
    );
    this.iconRegistry.addSvgIcon(
      "icon-search",
      this.sanitizer.bypassSecurityTrustResourceUrl("icons/icon-search.svg")
    );
  }

  ngOnInit() {
    this.updateAutocompleteOptions();
    this.modelChanged
      .pipe(debounceTime(this.debounce), distinctUntilChanged())
      .subscribe((model: string) => {
        this.searchTerm = model;
        this.keyUp();
      });
  }

  valueChange(s: string) {
    this.modelChanged.next(s);
  }

  public optionClicked(): void {
    // emit the new value
    this.onOptionChange.emit(this.option && !this.option.selected);
  }

  public search(): void {
    if (this.isDisabled) {
      return;
    }
    if (this.history && this.query) {
      // store new search query
      this.historyService.store(this.query);
    }
    this.onSearch.emit(this.query);
  }

  public keyUp(): void {
    this.onKeyUp.emit(this.query);
    this.updateAutocompleteOptions();
  }

  public focusSearchInput(): void {
    this.searchInput.nativeElement.focus();
  }

  private updateAutocompleteOptions(): void {
    this.filteredOptions = this.history
      ? this.historyService.getFilteredHistory(this.query || "")
      : [];
  }
}
