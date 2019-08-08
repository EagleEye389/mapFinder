import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";

import ClearButton from "../clearButton/ClearButton";

let component;
describe("Clearbutton is loaded properly", () => {
  beforeEach(() => {
    component = shallow(
      <ClearButton value={true} name="destination" onChangeInput={jest.fn()} />
    );
  });

  it("Should visible", () => {
    expect(component.find("div").hasClass("visible")).toBeTruthy();
  });

  it("Should not visible", () => {
    component.setProps({ value: false });
    expect(component.find("div").hasClass("visible")).toBeFalsy();
  });
});

describe("Clearbutton snapshot", () => {
  it("Should render correctly", () => {
    const tree = renderer
      .create(
        <ClearButton
          value={true}
          name="destination"
          onChangeInput={jest.fn()}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Should not render", () => {
    const tree = renderer
      .create(
        <ClearButton
          value={false}
          name="destination"
          onChangeInput={jest.fn()}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
