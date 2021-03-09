import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from "@angular/core";

@Component({
  selector: "cal-collapsable-tree",
  templateUrl: "collapsable-tree.component.html",
  styleUrls: ["collapsable-tree.css"],
})
export class CalypsoCollapsableTreeComponent implements OnInit, OnChanges {
  @Input() items = [];
  @Input() depth = 0;
  @Input() displayField = "displayName";

  @Output() itemSelected = new EventEmitter();

  public listItems = [];

  constructor() {}

  ngOnInit() {
    this.updateListItems();
  }

  ngOnChanges(changes) {
    if (changes["items"]) {
      this.updateListItems();
    }
  }

  public selectItem(item) {
    if (!item.disabled) {
      this.itemSelected.emit(item);
    }
  }

  public toggleExpanded(event, item) {
    event.stopPropagation();
    item.expanded = !item.expanded;
  }

  public onNodeItemSelected(event) {
    this.itemSelected.emit(event);
  }

  public itemAsText(item): string {
    if (typeof item === "string") {
      return item;
    }
    return item && item[this.displayField];
  }

  private updateListItems() {
    this.listItems = this.items.map((i) => {
      if (i.expanded === undefined) {
        i.expanded = true; // items are expanded by default
      }
      return i;
    });
  }
}
