import React from "react";
import { configure, shallow } from "enzyme";
import adapter from "enzyme-adapter-react-16";
import NavigationItems from "../Navigation/NavigationItems/NavigationItems";
import NavigationItem from "../Navigation/NavigationItems/NavigationItem/NavigationItem";

configure({ adapter: new adapter() });

describe("<NavigationItems/>", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });
  it("<NavigationItems/> should render 2 Navigation items if not authorised", () => {
    // const wrapper = shallow(<NavigationItems />);
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it("<NavigationItems/> should render 3 Navigation items if authorised", () => {
    wrapper.setProps({ isUserAuthorised: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it("<NavigationItems/> should an exact Log out Button ", () => {
    // const wrapper = shallow(<NavigationItems isUserAuthorised />);
    wrapper.setProps({ isUserAuthorised: true });
    expect(
      wrapper
        .find(NavigationItem)
        .contains(<NavigationItem link="/logout">Logout</NavigationItem>)
    ).toEqual(true);
  });
});
