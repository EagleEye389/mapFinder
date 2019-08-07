import React from "react";
import { shallow } from "enzyme";

import CrossButton from "../crossButton/CrossButton";

let component;
describe("CrossButton is loaded properly", () => {
  beforeEach(() => {
    component = shallow(
      <CrossButton value={true} name="destination" onChangeInput={jest.fn()} />
    );
  });
  it("Should render correctly", () => {
    expect(component).toMatchSnapshot();
  });
});
