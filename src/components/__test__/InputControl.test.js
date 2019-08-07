import React from "react";
import { mount } from "enzyme";

import InputControl from "../../container/input/InputControl";

let component;
let array = [1, 2, 3];
let input1, input1Instance, input2, input2Instance;
let resetArray = () => {
  array.length = 0;
};
describe("Input control functionality", () => {
  beforeEach(() => {
    component = mount(
      <InputControl
        google={{}}
        resetMap={() => resetArray()}
        getDirections={() => Promise.resolve({})}
      />
    );
  });
  beforeEach(() => {
    input1 = component.find("input").at(0);
    input1Instance = input1.instance();
    input2 = component.find("input").at(1);
    input2Instance = input2.instance();
  });

  it("Should update the state ", () => {
    input1Instance.value = "india";
    input1.simulate("change", { target: { value: "india" } });
    expect(component.state("from")).toBeTruthy();
  });

  it("Should show the cross button for first input box", () => {
    input1Instance.value = "india";
    input1.simulate("change", { target: { value: "india" } });
    expect(component.find("button").first()).toBeTruthy();
  });

  it("Should show the reset button and on click clear the state and map", () => {
    input1Instance.value = "india";
    input1.simulate("change", { target: { value: "india" } });
    input2Instance.value = "india";
    input2.simulate("change", { target: { value: "india" } });
    component
      .find("button")
      .at(1)
      .simulate("click");
    expect(component.state("from")).toBeFalsy();
    expect(input1Instance.value).toBe("");
    expect(array.length).toBe(0);
  });
});
