import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NavigationItem from "./NavigationItem";
import { NavLink } from "react-router-dom";

configure({ adapter: new Adapter() });

describe("<NavigationItem/>", () => {
  let wrapper;
  beforeEach(() => {
    // wrapper = shallow(<NavigationItem />);
  });

  it("should render one NavLink whewn link props is sent", () => {
    //   wrapper = shallow(<NavigationItem />);
    // wrapper.setProps({ link: "home" });
    // console.log("Debugs", wrapper.debug());
    // expect(wrapper.find(NavLink));
  });
});
