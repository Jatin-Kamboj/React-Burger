import React, { Component } from "react";

class ComponentClass extends Component {
  componentDidMount() {
    console.log(this.inputElement);
  }

  render() {
    return (
      <div>
        <input value="DD" ref={el => (this.inputElement = el)} />
      </div>
    );
  }
}

export default ComponentClass;
