import { OnInit, Component } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";

export const TENNIS_PLAYERS = [
  { name: "Roger Federer", grandSlams: 20 },
  { name: "Rafael Nadal", grandSlams: 18 },
  { name: "Novak Djokovic", grandSlams: 16 },
  { name: "Serena Williams", grandSlams: 23 },
  { name: "Andy Murray", grandSlams: 3 },
  { name: "Maria Sharapova", grandSlams: 5 },
  { name: "Venus Williams", grandSlams: 7 },
  { name: "Juan Martin Del Potro", grandSlams: 1 },
  { name: "Simona Halep", grandSlams: 2 },
  { name: "Diego Schwartzman", grandSlams: 0 },
  { name: "Stan Wawrinka", grandSlams: 3 },
];

export const CURRENCY_CODES = [
  "USD",
  "ARS",
  "EUR",
  "JPY",
  "CNY",
  "AFN",
  "BHD",
  "COU",
  "DKK",
  "GBP",
  "INR",
];

export const TREE_DATA = [
  {
    displayName: "Roland Garros Champions",
    children: [
      {
        displayName: "European Champions",
        disabled: true,
        children: [
          {
            displayName: "Spanish Champions",
            children: [
              {
                displayName: "Rafael Nadal",
                disabled: true,
                children: [],
              },
              {
                displayName: "Juan Carlos Ferrero",
                children: [],
              },
              {
                displayName: "Carlos Moyá",
                children: [],
              },
            ],
          },
          {
            displayName: "Swedish Champions",
            children: [
              {
                displayName: "Björn Borg",
                children: [],
              },
            ],
          },
          {
            displayName: "Austrian Champions",
            children: [
              {
                displayName: "Thomas Muster",
                children: [],
              },
            ],
          },
        ],
      },
      {
        displayName: "American Champions",
        children: [
          {
            displayName: "Andre Agassi",
            children: [],
          },
          {
            displayName: "Jim Courrier",
            disabled: true,
            children: [],
          },
        ],
      },
      {
        displayName: "Australian Champions",
        children: [
          {
            displayName: "Rod Laver",
            children: [],
          },
          {
            displayName: "Roy Emerson",
            disabled: true,
            children: [],
          },
        ],
      },
    ],
  },
];

@Component({
  templateUrl: "../doc/demo.html",
  styleUrls: ["../doc/demo.css"],
})
export class AutocompleteMultiSelectDemoComponent implements OnInit {
  public disabled: boolean = false;
  public items1;
  public items2;
  public items3;
  public items4;
  public items5;
  public treeData1;
  public treeData2;
  public treeData3;
  public treeData4;
  public customChips;
  public selected1 = [];
  public selected2 = ["Diego Schwartzman"];
  public selected3 = [];
  public selected4 = [];
  public selected5 = [];
  public selected6 = [];
  public selected7 = [];
  public selected8 = [];
  public anySelected = false;

  formGroup: FormGroup = this.fb.group({
    autocompleteMultiSelect: "",
  });
  formItems;

  constructor(private fb: FormBuilder) {
    this.items1 = TENNIS_PLAYERS.map((p) => p.name);
    this.items2 = TENNIS_PLAYERS.map((p) => p.name);
    this.items3 = TENNIS_PLAYERS.slice();
    this.items4 = TENNIS_PLAYERS.slice();
    this.items5 = TENNIS_PLAYERS.slice();
    this.customChips = CURRENCY_CODES;
    this.treeData1 = JSON.parse(JSON.stringify(TREE_DATA));
    this.treeData2 = JSON.parse(JSON.stringify(TREE_DATA));
    this.treeData3 = JSON.parse(JSON.stringify(TREE_DATA));
    this.treeData4 = JSON.parse(JSON.stringify(TREE_DATA));
    this.formItems = TENNIS_PLAYERS.map((p) => p.name).slice();
  }

  ngOnInit() {
    this.formGroup.valueChanges.subscribe((v) =>
      console.log(
        "control value:",
        this.formGroup.controls.autocompleteMultiSelect.value
      )
    );
    this.formGroup.controls.autocompleteMultiSelect.setValue(["Stan Wawrinka"]);
  }

  public logChange(event) {
    console.log("change:", event);
  }
}
