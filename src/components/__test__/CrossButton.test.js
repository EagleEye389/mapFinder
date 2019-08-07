import React from "react";
import { shallow } from "enzyme";
import CrossButton from "../crossButton/CrossButton";

let component;
describe("CrossButton is ok", () => {
  beforeEach(() => {
    component = shallow(
      <CrossButton value={true} name="destination" onChangeInput={jest.fn()} />
    );
  });
  it("Rendering correctly", () => {
    expect(component).toMatchSnapshot();
  });
});
