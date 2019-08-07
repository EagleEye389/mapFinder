import React from "react";
import { shallow } from "enzyme";
import App from "../../container/App/App";

let component;
describe("Test component is rendering", () => {
  beforeEach(() => {
    component = shallow(<App />);
  });

  it("Should render basic control", () => {
    expect(component.find(".content").length).toBe(1);
  });

  it("Should check whether state is updated", () => {
    const path = [0, 1, 2, 3];
    const mockPath = { path };
    component.instance().updateMap(mockPath.path);
    expect(component.instance().state.path).toBe(mockPath.path);
  });
});
