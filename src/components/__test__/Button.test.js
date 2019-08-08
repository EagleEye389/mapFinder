import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";

import Button from "../button/Button";

let component;
let buttonText = "test";
let buttonType = "primary-button";
let a = 5;
const test = () => a++;

describe("Button component is working properly", () => {
  beforeEach(() => {
    component = shallow(
      <Button
        label={buttonText}
        type={buttonType}
        handleClick={test}
        disableCheck={true}
      />
    );
  });

  it("should render button and show text properly", () => {
    expect(component.props().children).toBe(buttonText);
  });

  it("should render button and check class is present", () => {
    expect(component.hasClass(buttonType)).toBe(true);
  });

  it("should render button and check click is working", () => {
    component.find("button").simulate("click");
    expect(a).toBe(6);
  });
});

describe("Button snapshot", () => {
  it("checks enable button snapshot", () => {
    const tree = renderer
      .create(
        <Button
          label={buttonText}
          type={buttonType}
          handleClick={test}
          disableCheck={true}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("checks disable button snapshot", () => {
    const tree = renderer
      .create(
        <Button
          label={buttonText}
          type={buttonType}
          handleClick={test}
          disableCheck={false}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
