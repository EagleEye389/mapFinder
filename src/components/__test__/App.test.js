import React from "react";
import { shallow } from "enzyme";

import App from "../../container/App/App";

let component;
describe("Test component is rendering", () => {
  beforeEach(() => {
    component = shallow(<App />);
  });

  it("Should render basic control", () => {
    expect(component.find("div[class='content']")).toBeTruthy();
  });

  it("Should check app snapshot", () => {
    expect(component).toMatchSnapshot();
  });
});
