import {
  Component,
  Input,
  ViewChild,
  HostListener,
  ElementRef,
  AfterViewInit,
  OnInit,
  EventEmitter,
  Output,
} from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

enum Sides {
  Top,
  Bottom,
  Right,
  Left,
}

@Component({
  selector: "cal-resizable-container",
  templateUrl: "resizable-container.component.html",
  styleUrls: ["resizable-container.component.css"],
})
export class CalypsoResizableContainerComponent {
  @Input("max-width") maxWidth;
  @Input("max-height") maxHeight;
  @Input("vertical") vertical = true;
  @Input("horizontal") horizontal = false;
  @Input("initial-height") initialHeight;
  @Input("toggle-mode") toggleMode = false;
  // if toggle-mode enabled toggle between percent sizes
  @Input("toggle-steps") toggleSteps = [0, 100];
  // a list of toggle steps as percent numbers
  @Input("icon") icon = "icon-unmatched";
  @Input("parent-ref") parentRef: ElementRef;

  @Output() onResized = new EventEmitter<MouseEvent>();
  @ViewChild("container", { static: true }) container: ElementRef;

  private oldY = 0;
  private oldX = 0;
  public dragging: boolean = false;
  public width: number;
  public height: number;
  public SidesType = Sides;

  private handlers = {
    [Sides.Bottom]: (event: MouseEvent) => {
      const offsetY = event.clientY - this.oldY;
      const height = this.height || this.container.nativeElement.offsetHeight;
      this.height = height + offsetY;
    },
    [Sides.Right]: (event: MouseEvent) => {
      const offsetX = event.clientX - this.oldX;
      const width = this.width || this.container.nativeElement.offsetWidth;
      this.width = width + offsetX;
    },
  };

  // toggle mode settings
  private toggleTotal: number;
  public toggleStep = 0;
  private toggleModeHandlers = {
    [Sides.Bottom]: (step) => {
      this.height = (this.toggleTotal * this.toggleSteps[step]) / 100;
    },
    [Sides.Right]: (step) => {
      this.width = (this.toggleTotal * this.toggleSteps[step]) / 100;
    },
  };
  private sideResizing: Sides;

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    this.iconRegistry.addSvgIcon(
      "icon-unmatched",
      this.sanitizer.bypassSecurityTrustResourceUrl(
        `~/icons/src/icon-unmatched.svg`
      )
    );
  }

  ngOnInit() {
    if (this.toggleMode) {
      const parent =
        this.parentRef || this.container.nativeElement.parentElement;

      this.toggleTotal = this.vertical
        ? parent.offsetHeight
        : parent.offsetWidth;
      this.toggleStep = 0;
      this.toggleModeHandlers[this.vertical ? Sides.Bottom : Sides.Right](0);
    }
  }

  onClick() {
    if (this.toggleMode) {
      this.toggleStep =
        this.toggleStep < this.toggleSteps.length - 1 ? this.toggleStep + 1 : 0;
      this.toggleModeHandlers[this.sideResizing](this.toggleStep);
    }
  }

  @HostListener("document:mousemove", ["$event"])
  onMouseMove(event: MouseEvent) {
    if (this.toggleMode || !this.dragging) {
      return;
    }
    this.handlers[this.sideResizing](event);
    this.oldY = event.clientY;
    this.oldX = event.clientX;
  }

  @HostListener("document:mouseup", ["$event"])
  onMouseUp(event: MouseEvent) {
    if (this.toggleMode) {
      return;
    }
    this.dragging = false;
    if (this.height) {
      this.initialHeight = undefined;
    }
    this.onResized.emit(event);
  }

  public onMouseDown(event: MouseEvent, side: Sides): void {
    this.sideResizing = side;
    if (!this.toggleMode) {
      this.dragging = true;
      this.oldY = event.clientY;
      this.oldX = event.clientX;
    }
  }
}
