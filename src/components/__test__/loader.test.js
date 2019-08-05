import React from "react";
import { shallow } from "enzyme";
import { Loader } from "../Loader/Loader";

let component;

describe("Loader test when isLoading props is false ", () => {
  beforeEach(() => {
    component = shallow(<Loader isLoading={false} />);
  });
  it("does not has loader-box", () => {
    expect(component.find(".loader-box").length).toEqual(0);
  });
  it("doesnot render", () => {
    expect(component).toMatchSnapshot();
  });
});

describe("Loader test when isLoading props is true", () => {
  beforeEach(() => {
    component = shallow(<Loader isLoading={true} />);
  });
  it("has loader-box", () => {
    expect(component.find(".loader-box").length).toEqual(1);
  });
  it("renders correctly", () => {
    expect(component).toMatchSnapshot();
  });
});
