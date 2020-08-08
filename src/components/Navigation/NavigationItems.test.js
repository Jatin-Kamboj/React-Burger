import React from "react";
import enzyme, { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NavigationItem from "./NavigationItems/NavigationItem/NavigationItem";
import NavigationItems from "./NavigationItems/NavigationItems";

/**
 * Here we are configuring the enzyme with react version on which application is running.
 */
configure({ adapter: new Adapter() });

describe("<Navigation items/> ", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });

  it("should render two <NavigationItem/> elements if not authorised", () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it("should render three <NavigationItem/> elements if  authorised", () => {
    wrapper.setProps({ isUserAuthorised: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it("should contain logout navigation of unAuthorised", () => {
    wrapper.setProps({ isUserAuthorised: true });
    expect(
      wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)
    ).toEqual(true);
  });
});
