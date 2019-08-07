import React from "react";
import { shallow } from "enzyme";

import ClearButton from "../clearButton/ClearButton";

let component;
describe("Clearbutton is loaded properly", () => {
  beforeEach(() => {
    component = shallow(
      <ClearButton value={true} name="destination" onChangeInput={jest.fn()} />
    );
  });
  it("Should render correctly", () => {
    expect(component).toMatchSnapshot();
  });
});
