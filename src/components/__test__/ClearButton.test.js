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

  it("should visible", () => {
    expect(component.find("div").hasClass("visible")).toBeTruthy();
  });

  it("should not visible", () => {
    component.setProps({ value: false });
    expect(component.find("div").hasClass("visible")).toBeFalsy();
  });
});

describe("Clearbutton snapshot", () => {
  it("should render correctly", () => {
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
  it("should not render", () => {
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
