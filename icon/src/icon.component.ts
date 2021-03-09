import { Component, Input, OnInit } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "cal-icon",
  templateUrl: "icon.component.html",
  styleUrls: ["icon.css"],
})
export class CalypsoIconComponent implements OnInit {
  @Input() icon: string;
  @Input() iconClass: string = "";
  @Input() inline: boolean = true;
  @Input() size: number = 24;
  @Input() disabled: boolean = false;

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    if (!this.icon) {
      console.error("cal-icon: No icon name provided");
      return;
    }
    this.registerIcon(this.icon);
  }

  private registerIcon(icon: string): void {
    const url = new URL(`../../styles/icons/${icon}.svg`,import.meta.url)
    this.iconRegistry.addSvgIcon(
      icon,
      this.sanitizer.bypassSecurityTrustResourceUrl(url.pathname)
    );
  }
}
