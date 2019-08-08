import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";

import App from "../../container/App/App";

describe("App component is rendering correctly", () => {
  it("Should render basic control", () => {
    let component = shallow(<App />);
    expect(component.find("div[class='content']")).toBeTruthy();
  });

  it("Should check app snapshot", () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
