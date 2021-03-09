import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter,
} from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material/icon";

const SELECTED = "selected";
const UNSELECTED = "unselected";

export interface DoubleListChangeEvent {
  type: "selected" | "unselected";
  items: any[];
  selected: any[];
}

@Component({
  selector: "cal-double-list",
  templateUrl: "double-list.component.html",
  styleUrls: ["double-list.css"],
})
export class CalypsoDoubleListComponent<T> implements OnChanges {
  @Input() displayField: string = "displayName";
  @Input() items: T[] = [];
  @Input() selectedItems: T[] = [];
  @Input() allowAny = false;
  @Input() searchOnEnter = false;
  @Input() positionControls = false;
  @Output() changed: EventEmitter<DoubleListChangeEvent> = new EventEmitter();
  public filteredItems: T[] = [];
  public filteredSelectedItems: T[] = [];
  public selectedSearch = "";
  public availableSearch = "";
  public noItemsSelectedText = "";
  public currentSelected;

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    this.iconRegistry.addSvgIcon(
      "icon-arrow",
      this.sanitizer.bypassSecurityTrustResourceUrl("icons/icon-arrow.svg")
    );
    this.iconRegistry.addSvgIcon(
      "light-close",
      this.sanitizer.bypassSecurityTrustResourceUrl("icons/light-close.svg")
    );
  }

  ngOnChanges(e): void {
    this.filteredItems = this.items.slice();
    this.filteredSelectedItems = this.selectedItems.slice();
    this.noItemsSelectedText = this.allowAny
      ? "Any"
      : "No items have been selected";
  }

  public select(item: T): void {
    this.switchArrays(item, this.items, this.selectedItems);
    this.refreshLists();
    this.changed.emit({
      type: SELECTED,
      items: [item],
      selected: this.selectedItems,
    });
  }

  public unselect(item: T): void {
    this.switchArrays(item, this.selectedItems, this.items);
    this.refreshLists();
    this.changed.emit({
      type: UNSELECTED,
      items: [item],
      selected: this.selectedItems,
    });
  }

  public selectedItemClick(item: T): void {
    if (this.positionControls) {
      this.currentSelected =
        this.currentSelected !== this.itemAsText(item)
          ? this.itemAsText(item)
          : undefined;
    } else {
      this.unselect(item);
    }
  }

  public moveToTop(): void {
    const index = this.selectedItems.indexOf(this.currentSelected);
    this.moveItemInSelectedItems(index, 0);
    this.refreshLists();
  }

  public moveToBottom(): void {
    const index = this.selectedItems.indexOf(this.currentSelected);
    this.moveItemInSelectedItems(index, this.selectedItems.length - 1);
    this.refreshLists();
  }

  public moveDown(): void {
    const index = this.selectedItems.indexOf(this.currentSelected);
    this.moveItemInSelectedItems(index, index + 1);
    this.refreshLists();
  }

  public moveUp(): void {
    const index = this.selectedItems.indexOf(this.currentSelected);
    if (!index) {
      return;
    }
    this.moveItemInSelectedItems(index, index - 1);
    this.refreshLists();
  }

  public searchAvailable(query: string): void {
    if (!query) {
      this.filteredItems = this.items.slice();
    } else {
      const upperCaseQuery = query.toUpperCase();
      this.filteredItems = this.items.filter(
        (item: T) =>
          this.itemAsText(item).toUpperCase().indexOf(upperCaseQuery) > -1
      );
    }
  }

  public filterAvailable(query: string) {
    if (!this.searchOnEnter) {
      this.searchAvailable(query);
    }
  }

  public filterSelected(query: string) {
    if (!this.searchOnEnter) {
      this.searchSelected(query);
    }
  }

  public searchSelected(query: string): void {
    if (!query) {
      this.filteredSelectedItems = this.selectedItems.slice();
    }
    const upperCaseQuery = query.toUpperCase();
    this.filteredSelectedItems = this.selectedItems.filter(
      (item: T) =>
        this.itemAsText(item).toUpperCase().indexOf(upperCaseQuery) > -1
    );
  }

  public clearAll(): void {
    this.changed.emit({
      type: UNSELECTED,
      items: this.selectedItems,
      selected: [],
    });
    this.items.push(...this.selectedItems);
    this.selectedItems.splice(0, this.selectedItems.length);
    this.selectedSearch = "";
    this.currentSelected = null;
    this.refreshLists();
  }

  public itemAsText(item: T): string {
    if (typeof item === "string") {
      return item;
    }
    return item[this.displayField];
  }

  private moveItemInSelectedItems(from, to): void {
    const item = this.selectedItems.splice(from, 1)[0];
    this.selectedItems.splice(to, 0, item);
  }

  private refreshLists(): void {
    this.searchAvailable(this.availableSearch);
    this.searchSelected(this.selectedSearch);
  }

  private switchArrays(item: T, from: T[], to: T[]): void {
    const index = from.findIndex((i) => i === item);
    to.push(from.splice(index, 1)[0]);
  }
}
