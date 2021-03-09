import {
  Component,
  OnInit,
  Input,
  OnChanges,
  ViewChild,
  HostListener,
  Renderer2,
  AfterViewInit,
  Output,
  EventEmitter,
} from "@angular/core";
import { MatMenuTrigger } from "@angular/material/menu";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  ValidationErrors,
} from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
// import { Logger, CalypsoLogger } from "@calypso-webcore/logging";
import { Logger } from "../../logging";
const DEFAULT_CHIP_WIDTH = 190;

@Component({
  selector: "cal-autocomplete-multi-select",
  templateUrl: "/autocomplete-multi-select.component.html",
  styleUrls: ["/autocomplete-multi-select.css"],
})
export class CalypsoAutocompleteMultiSelectComponent<T>
  implements OnInit, OnChanges, AfterViewInit {
  @Input() displayField: string = "displayName";
  @Input() items: T[] = [];
  @Input() selectedItems: T[];
  @Input() isDisabled: boolean = false;
  @Input() placeholder: string = "Select element";
  @Input() chipWidth: number = DEFAULT_CHIP_WIDTH;
  @Input() chips: boolean = false;
  @Input() allowNew: boolean = false;
  @Input() enableAnyMode = false;
  @Input() anySelected: boolean = false;
  @Input() anyLabel: string = "Any";
  @Input() treeView: boolean = false;
  @Input() singleSelection: boolean = true; // for the moment only available for treeview
  @Input() longText: boolean = false;
  @Input() idField: string;
  @Input() panelClass: string;

  // Passed in form control
  @Input("required") required = false;
  @Input() control: FormControl;

  @ViewChild("autocomplete", { static: false }) autocomplete;
  @ViewChild(MatMenuTrigger, { static: false }) menuTrigger: MatMenuTrigger;
  @ViewChild("multiSelect", { static: true }) multiSelect;
  @ViewChild("selectedChips", { static: false }) selectedChips;

  @Output() onChange = new EventEmitter();
  @Output() selectedItemsChange = new EventEmitter();
  @Output() anySelectedChange = new EventEmitter();

  public filteredItems: T[] = [];
  public visibleSelectedItems: T[] = [];
  public filterForm: FormGroup;
  public searching: boolean = false;
  public menuOpened: boolean;
  public display: string;
  public menuPanelClass: string = "autocomplete-multi-select-menu-panel";

  // @CalypsoLogger("CalypsoAutocompleteMultiSelectComponent")
  private logger = new Logger();

  constructor(
    private fb: FormBuilder,
    private renderer: Renderer2,
    private translateService: TranslateService
  ) {
    this.filterForm = this.fb.group({
      filterControl: new FormControl({ value: "", disabled: this.isDisabled }),
    });
  }

  ngOnInit(): void {
    this.itemsChanged();
    this.filterForm.valueChanges.subscribe((o) => {
      const query = o["filterControl"];
      this.filterList(query);
      this.searching = !!query;
    });
    if (this.panelClass) {
      this.menuPanelClass += " " + this.panelClass;
    }
    if (this.control) {
      this.logger.debug(() => "Form control input value" + this.control.value);
      if (this.control.value) {
        this.selectedItems = this.control.value.slice();
        this.selectedItemsChange.emit(this.selectedItems);
        this.logger.debug(
          () =>
            "Form control input has value. Setting selectedItems" +
            this.selectedItems
        );
      }
      if (this.required) {
        const existingValidators = this.control.validator;
        // without this timeout we have an ExpressionChangedAfterItHasBeenCheckedError
        setTimeout(() => {
          this.control.setValidators(
            Validators.compose([
              existingValidators,
              (c: FormControl) => this.validateRequired(c),
            ])
          );
          // if we don't set again control.value, on first display, if control is not valid, the control.parent doesn't know it
          this.control.setValue(this.control.value);
        });
      }
    }
  }

  ngAfterViewInit() {
    setTimeout(() => this.updateView());
  }

  ngOnChanges(changes): void {
    if (
      !this.control &&
      changes["selectedItems"] &&
      !changes["selectedItems"].currentValue &&
      changes["selectedItems"].firstChange
    ) {
      this.selectedItems = [];
      this.selectedItemsChange.emit(this.selectedItems);
      this.updateView();
      throw new Error(
        "Please initialize the selectedItems input for autocomplete multi-select to an empty array."
      );
    }

    if (changes["isDisabled"]) {
      this.filterForm = this.fb.group({
        filterControl: new FormControl({
          value: "",
          disabled: this.isDisabled,
        }),
      });
      this.updateView();
    }

    if (changes["items"] && !changes["items"].firstChange) {
      this.itemsChanged();
      this.updateView();
    }

    if (changes["control"]) {
      if (this.control.value) {
        this.logger.debug(
          () =>
            "Form control value has changed. Old value: " +
            this.selectedItems +
            " New value: " +
            this.control.value
        );
        this.selectedItems = this.control.value.slice();
        this.selectedItemsChange.emit(this.selectedItems);
        this.itemsChanged();
        this.updateView();
      }
    }
  }

  add(event: T): void {
    // To make sure this does not conflict with OptionSelected Event
    if (this.filteredItems.length === 0) {
      const input = event["input"];
      const value = event["value"];

      // new options
      if (this.allowNew && (value || "").trim()) {
        const item = this.createNewItem(value);
        this.shouldShowChip(item);
        this.selectedItems.push(item);
        this.selectedItemsChange.emit(this.selectedItems);
        if (this.control) {
          this.control.setValue(this.selectedItems);
          this.logger.debug(
            () => "Form control input value after add: " + this.control.value
          );
        }
      }

      // Reset the input value
      if (input) {
        input.value = "";
      }

      this.filterForm.controls["filterControl"].setValue(null);
    }
  }

  private createNewItem(value: T): any {
    if (this.items[0] && typeof this.items[0] !== "string") {
      const obj = {};
      obj[this.displayField] = value;
      return obj;
    }
    return value;
  }

  public onTreeItemSelected(item) {
    if (this.singleSelection && this.selectedItems.length >= 1) {
      this.removeFromArray(this.selectedItems, this.selectedItems[0]);
      this.removeFromArray(
        this.visibleSelectedItems,
        this.visibleSelectedItems[0]
      );
    }

    if (
      !this.singleSelection &&
      this.selectedItems.findIndex((el) => this.equals(el, item)) > -1
    ) {
      this.unselect(item);
      return;
    }

    this.select(item);
  }

  @HostListener("document:click", ["$event.target"])
  public onClick(targetElement) {
    // close menu unless click is on filter input
    if (
      this.autocomplete &&
      this.autocomplete.nativeElement !== targetElement
    ) {
      this.menuTrigger.closeMenu();
    }
  }

  @HostListener("document:keydown.escape", ["$event"]) onEscKeydownHandler(
    event: KeyboardEvent
  ) {
    this.menuTrigger.closeMenu();
  }

  @HostListener("document:keydown.tab", ["$event"]) onTabKeydownHandler(
    event: KeyboardEvent
  ) {
    this.menuTrigger.closeMenu();
  }

  public removeChip(item: T): void {
    if (this.isDisabled) {
      return;
    }

    this.removeFromArray(this.selectedItems, item);
    this.removeFromArray(this.visibleSelectedItems, item);
    this.handleVisibleChips();
    const hiddenChipsCount =
      this.selectedItems.length - this.visibleSelectedItems.length;
    this.setInputValue(hiddenChipsCount > 0 ? `(+${hiddenChipsCount})` : "");
    this.onChange.emit(this.selectedItems);
    this.selectedItemsChange.emit(this.selectedItems);

    if (this.treeView) {
      this.toggleNodeSelection(item, false);
    }
  }

  public openMenu(): void {
    if (!this.isDisabled) {
      this.onMenuOpened();
      this.menuTrigger.openMenu();
    }
  }

  public itemAsText(item: T, uppercase: boolean = false): string {
    if (typeof item === "string") {
      return uppercase ? item.toUpperCase() : item;
    }
    const text = item && item[this.displayField];
    return uppercase ? text.toUpperCase() : text;
  }

  public select(item: T): void {
    if (this.enableAnyMode) {
      this.anySelected = false;
      this.anySelectedChange.emit(this.anySelected);
    }

    if (this.treeView) {
      this.toggleNodeSelection(item, true);
      this.selectedItems.push(item);
      this.selectedItemsChange.emit(this.selectedItems);
      if (this.control) {
        this.control.setValue(this.selectedItems);
        this.logger.debug(
          () =>
            "Form control input value select tree view: " + this.control.value
        );
      }
    } else {
      this.switchArrays(item, this.filteredItems, this.selectedItems);
    }
    if (this.control) {
      this.control.setValue(this.selectedItems);
      this.logger.debug(
        () => "Form control input value after remove: " + this.control.value
      );
    }
    this.selectedItemsChange.emit(this.selectedItems);
    if (this.chips) {
      this.shouldShowChip(item);
    }
  }

  public unselect(item: T): void {
    if (this.treeView) {
      this.removeFromArray(this.selectedItems, item);
      this.toggleNodeSelection(item, false);
    } else {
      this.switchArrays(item, this.selectedItems, this.filteredItems);
    }

    if (this.chips) {
      const visibleChip =
        this.visibleSelectedItems.findIndex((i) => i === item) > -1;

      if (visibleChip) {
        this.removeFromArray(this.visibleSelectedItems, item);
        this.handleVisibleChips();
      }
    } else {
      this.filterList(this.filterForm.controls["filterControl"].value); // keep list ordered
    }
  }

  public filterList(query: string): void {
    const items = this.getAvailableItems();
    if (!query) {
      if (this.treeView) {
        this.setAllTreeNodesVisible();
      } else {
        this.filteredItems = items;
      }

      return;
    }

    const upperQuery = query.toUpperCase();
    if (this.treeView) {
      this.treeSearch(this.items[0], query);
      this.filteredItems = this.items.slice();
    } else {
      this.filteredItems = items.filter(
        (item) => this.itemAsText(item, true).indexOf(upperQuery) > -1
      );
    }
  }

  public onMenuClosed(): void {
    this.menuOpened = false;
    this.handleDisplayText();
    this.onChange.emit(this.selectedItems);
    this.selectedItemsChange.emit(this.selectedItems);
    if (this.control) {
      this.control.setValue(this.selectedItems);
      this.logger.debug(
        () => "Form control input value after remove: " + this.control.value
      );
    }
  }

  public toggleAny() {
    this.anySelected = !this.anySelected;
    this.anySelectedChange.emit(this.anySelected);
    if (this.anySelected) {
      this.selectedItems.length = 0;
      this.selectedItemsChange.emit(this.selectedItems);
      if (this.control) {
        this.control.setValue(this.selectedItems);
        this.logger.debug(
          () =>
            "Form control input value after toggle any: " + this.control.value
        );
      }
      this.visibleSelectedItems.length = 0;
    }
    this.updateView();
  }

  private itemsChanged() {
    // keep those selected items that are available in the new items collection
    const newSelected = [];
    if (this.selectedItems) {
      this.selectedItems.forEach((i) => {
        if (this.items.indexOf(i) > -1) {
          newSelected.push(i);
        }
      });
      this.logger.debug(
        () =>
          "Selected items in items changed: " +
          this.selectedItems +
          " newSelected: " +
          newSelected
      );
      this.selectedItems = newSelected.slice();
      this.selectedItemsChange.emit(this.selectedItems);
      if (this.control) {
        this.control.setValue(this.selectedItems);
        this.logger.debug(
          () =>
            "Form control input value after items changed: " +
            this.control.value
        );
      }
    } else if (this.control && this.control.value) {
      this.selectedItems = this.control.value;
    }

    this.visibleSelectedItems.length = 0;
    const items = this.getAvailableItems();
    if (this.treeView) {
      this.initTreeNodes(items[0]);
    }

    this.filteredItems = items.slice();
  }

  private shouldShowChip(item: T) {
    if (
      this.selectedChips.nativeElement.offsetWidth + this.chipWidth <
      this.getAvailableSpaceForChips()
    ) {
      this.visibleSelectedItems.push(item);
    }
  }

  private toggleNodeSelection(node, isSelected: boolean) {
    const toggleSelection = (n, selected) => {
      if (n) {
        if (this.equals(n, node)) {
          n.selected = isSelected;
        } else if (this.singleSelection && isSelected) {
          // if node is selected and singleSelection is true, all other nodes should have selected = false
          n.selected = false;
        }

        // tslint:disable-next-line:no-unused-expression
        n.children && n.children.forEach((_n) => toggleSelection(_n, selected));
      }
    };
    this.items.forEach((i: any) => toggleSelection(i, isSelected));
  }

  private setAllTreeNodesVisible() {
    const setNodeVisible = (node) => {
      if (node) {
        node.visible = true;

        // tslint:disable-next-line:no-unused-expression
        node.children && node.children.forEach((n) => setNodeVisible(n));
      }
    };
    this.items.forEach((i) => setNodeVisible(i));
  }

  private initTreeNodes(node) {
    if (!node) {
      return;
    }

    if (node.selected === undefined || (node.selected && node.disabled)) {
      node.selected = false; // nodes are unselected by default
    } else if (node.selected) {
      this.onTreeItemSelected(node);
    }
    node.visible = true; // nodes are visible by default

    for (let index = 0; index < node.children.length; index++) {
      this.initTreeNodes(node.children[index]);
    }
  }

  private treeSearch(item, query) {
    let result = false;
    if (!item) {
      return result;
    }

    if (this.itemAsText(item, true).indexOf(query.toUpperCase()) > -1) {
      result = true;
    }

    for (let index = 0; index < item.children.length; index++) {
      const element = item.children[index];
      if (this.treeSearch(element, query)) {
        result = true;
      }
    }

    item.visible = result;
    return result;
  }

  private handleDisplayText(): void {
    if (this.anySelected) {
      this.displayTextAnyOption();
    } else if (this.chips) {
      this.displayTextForChips();
    } else if (this.longText) {
      this.displayTextLongVersion();
    } else {
      this.displayTextDefault();
    }
  }

  private displayTextForChips(): void {
    const hiddenChipsCount =
      this.selectedItems.length - this.visibleSelectedItems.length;
    this.setInputValue(hiddenChipsCount > 0 ? `(+${hiddenChipsCount})` : "");
  }

  private displayTextAnyOption(): void {
    this.display = this.anyLabel;
    this.setInputValue(this.anyLabel);
  }

  private displayTextLongVersion(): void {
    this.display = "";
    this.setInputValue(
      this.selectedItems &&
        this.selectedItems.map((i) => this.itemAsText(i)).join(", ")
    );
  }

  private displayTextDefault(): void {
    let moreText = "";
    this.display = this.selectedItems && this.itemAsText(this.selectedItems[0]);

    if (this.selectedItems.length > 1) {
      moreText = "(+" + (this.selectedItems.length - 1) + ")";
    } else if (this.selectedItems.length === 1) {
      moreText = " ";
    }

    this.setInputValue(moreText);
  }

  private handleVisibleChips(): void {
    let current = 0;
    let width =
      this.selectedChips && this.selectedChips.nativeElement.offsetWidth;
    while (
      current < this.selectedItems.length &&
      width < this.getAvailableSpaceForChips()
    ) {
      const item = this.selectedItems[current];
      if (this.visibleSelectedItems.findIndex((e) => e === item) === -1) {
        width += this.chipWidth;
        this.visibleSelectedItems.push(item);
      }
      current++;
    }
  }

  private removeFromArray(array: T[], item: T): void {
    const index = array.findIndex((el) => this.equals(el, item));
    if (index >= 0) {
      array.splice(index, 1);
    }
    if (this.control) {
      this.control.setValue(this.selectedItems);
      this.logger.debug(
        () => "Form control input value after remove: " + this.control.value
      );
    }
  }

  private updateView() {
    if (this.chips) {
      this.handleVisibleChips();
    }
    this.handleDisplayText();
  }

  private setInputValue(s: string) {
    this.filterForm.controls["filterControl"].setValue(s);
  }

  private onMenuOpened(): void {
    setTimeout(() => {
      this.renderer.setStyle(
        document.getElementsByClassName("mat-menu-panel")[0],
        "width",
        this.autocomplete.nativeElement.offsetWidth + "px"
      );
      this.autocomplete.nativeElement.focus();
    }, 0);
    this.menuOpened = true;
    this.setInputValue("");
  }

  private switchArrays(item: T, from: T[], to: T[]): void {
    const index = from.findIndex((i) => i === item);
    to.push(from.splice(index, 1)[0]);
  }

  private getAvailableItems(): T[] {
    return this.items
      .filter((i) => this.selectedItems.indexOf(i) === -1)
      .sort();
  }

  private getAvailableSpaceForChips(): number {
    return this.multiSelect.nativeElement.offsetWidth - 25;
  }

  private equals(item, anotherItem) {
    return this.idField
      ? item[this.idField] === anotherItem[this.idField]
      : this.itemAsText(item) === this.itemAsText(anotherItem);
  }

  private validateRequired(control: FormControl): ValidationErrors {
    const valueReturned = control.value;
    let error = null;
    if (this.enableAnyMode) {
      if (
        !valueReturned ||
        (!valueReturned.any &&
          (!valueReturned.selectedValues ||
            valueReturned.selectedValues.length === 0))
      ) {
        error = { requiredError: true };
      }
    } else {
      if (!valueReturned || valueReturned.length === 0) {
        error = { requiredError: true };
      }
    }
    return error;
  }
}
