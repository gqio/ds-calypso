import { MatTableDataSource } from "@angular/material/table";
import { Component } from "@angular/core";

const EUROPE_MOUNTAINS = [
  { name: "Mount Elbrus", country: "Rusia", height: "5642" },
  { name: "Mont Blanc", country: "France/Italy", height: "4809" },
  { name: "Mount Etna", country: "Italy", height: "3329" },
  { name: "Mulhacén", country: "Spain", height: "3479" },
  { name: "Aneto", country: "Spain", height: "2812" },
  { name: "Monte Cinto", country: "France", height: "2706" },
];

const ASIA_MOUNTAINS = [
  { name: "Mount Everest", country: "Nepal/China", height: "8848" },
  { name: "K2", country: "Pakistan/China", height: "8611" },
  { name: "Kangchenjunga", country: "Nepal/India", height: "8586" },
  { name: "Lhotse", country: "Nepal/China", height: "8516" },
  { name: "Makalu", country: "Nepal/China", height: "8485" },
  { name: "Cho Oyu", country: "Nepal/China", height: "8188" },
];

const displayedColumns = ["name", "country", "height"];

export class componentDemo {
  public dataSource1: MatTableDataSource<any>;
  public dataSource2: MatTableDataSource<any>;
  public displayedColumns: string[] = displayedColumns;

  constructor() {
    this.dataSource1 = new MatTableDataSource(EUROPE_MOUNTAINS);
    this.dataSource2 = new MatTableDataSource(ASIA_MOUNTAINS);
  }
}

export const component = (templateUrl: string) => {
  @Component({ templateUrl:new URL(templateUrl,(import.meta as any).url).pathname })
  class c extends componentDemo {}
  return c;
};
