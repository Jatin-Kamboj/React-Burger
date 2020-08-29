import React from "react";
import enzyme, { configure, shallow } from "enzyme";
// import Adapter from "enzyme-adapter-react-16";
import Logo from "./Logo";

/**
 * Here we are configuring the enzyme with react version on which application is running.
 */
// configure({ adapter: new Adapter() });

describe("<Logo/>", () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(<Logo />);
  });

  it("should render image tag", () => {
    expect(wrapper.find("img")).toHaveLength(1);
  });
});
