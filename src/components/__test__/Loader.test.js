import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";

import Loader from "../loader/Loader";

let component;

describe("Loader test when isLoading props is false ", () => {
  beforeEach(() => {
    component = shallow(<Loader isLoading={false} />);
  });
  it("does not has loader-box", () => {
    expect(component.find(".loader-box").length).toEqual(0);
  });
});

describe("Loader snapshot", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Loader isLoading={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("doesnot render", () => {
    const tree = renderer.create(<Loader isLoading={false} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Loader test when isLoading props is true", () => {
  beforeEach(() => {
    component = shallow(<Loader isLoading={true} />);
  });
  it("has loader-box", () => {
    expect(component.find(".loader-box").length).toEqual(1);
  });
});
