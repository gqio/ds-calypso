import { TestBed, ComponentFixture, waitForAsync } from "@angular/core/testing";
import { TestbedHarnessEnvironment } from "@angular/cdk/testing/testbed";
import { MatCheckboxHarness } from "@angular/material/checkbox/testing";
import { HarnessLoader } from "@angular/cdk/testing";
import { ReactiveFormsModule } from "@angular/forms";
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from "@angular/platform-browser-dynamic/testing";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { Component } from "@angular/core";
import { expect } from "chai";
// import "zone.js/dist/zone"; // used for change detection
// import "zone.js/dist/async-test.js";

@Component({
  selector: "checkbox-harness-example",
  templateUrl: "checkbox-harness-example.html",
})
class CheckboxHarnessExample {
  disabled = true;
}

describe("CheckboxHarnessExample", () => {
  let fixture: ComponentFixture<CheckboxHarnessExample>;
  let loader: HarnessLoader;

  beforeEach(() => {
    TestBed.initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting()
    );
  });

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [MatCheckboxModule, ReactiveFormsModule],
        declarations: [CheckboxHarnessExample],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxHarnessExample);
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it("should load checkbox with name", async () => {
    const checkboxes = await loader.getAllHarnesses(
      MatCheckboxHarness.with({ name: "first-name" })
    );
    expect(checkboxes.length).equal(1);
    expect(await checkboxes[0].getLabelText()).equal("First");
  });

  it("should get checked state", async () => {
    const [checkedCheckbox, uncheckedCheckbox] = await loader.getAllHarnesses(
      MatCheckboxHarness
    );
    expect(await checkedCheckbox.isChecked()).equal(true);
    expect(await uncheckedCheckbox.isChecked()).equal(false);
  });

  it("should get name", async () => {
    const checkbox = await loader.getHarness(
      MatCheckboxHarness.with({ label: "First" })
    );
    expect(await checkbox.getName()).equal("first-name");
  });

  it("should get label text", async () => {
    const [firstCheckbox, secondCheckbox] = await loader.getAllHarnesses(
      MatCheckboxHarness
    );
    expect(await firstCheckbox.getLabelText()).equal("First");
    expect(await secondCheckbox.getLabelText()).equal("Second");
  });

  it("should toggle checkbox", async () => {
    fixture.componentInstance.disabled = false;
    const [checkedCheckbox, uncheckedCheckbox] = await loader.getAllHarnesses(
      MatCheckboxHarness
    );
    await checkedCheckbox.toggle();
    await uncheckedCheckbox.toggle();
    expect(await checkedCheckbox.isChecked()).equal(false);
    expect(await uncheckedCheckbox.isChecked()).equal(true);
  });
});
