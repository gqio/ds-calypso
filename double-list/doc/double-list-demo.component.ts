import { Component } from "@angular/core";

@Component({
  templateUrl: "../doc/demo.html",
  styleUrls: ["../doc/demo.css"],
})
export class DoubleListDemoComponent {
  public items = [
    { population: "24.1m", name: "Shanghai" },
    { population: "18.5m", name: "Beijing" },
    { population: "18m", name: "Karachi" },
    { population: "14.6m", name: "Istanbul" },
    { population: "14.5m", name: "Dhaka" },
    { population: "13.6m", name: "Tokyo" },
    { population: "13.1m", name: "Moscow" },
    { population: "12.8m", name: "Manila" },
  ];
  public selected = [];
  public sItems = [
    "Seattle",
    "Los Angeles",
    "San Francisco",
    "Portland",
    "San Diego",
    "San Jose",
    "Oakland",
    "Sacramento",
  ];
  public sSelected = [];
}
