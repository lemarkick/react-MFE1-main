import React, { useState } from "react";
import { ReactComponentElement } from "react";

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  handleChange = () => {
    this.handleFetch(this.props.value);
  };

  handleFetch = (target) => {
    fetch("http://localhost:5555/items?rocId=" + target, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          data: data,
        });
      })
      /*
      .then((data) => {
        let members = data;
        members.map(function (member) {
          this.setState({
            fname: `${member.fname}`,
            gender: `${member.gender}`,
            email: `${member.email}`,
          });
        });
      })
      */
      .catch((err) => {
        console.error(err);
      });
  };

  render() {
    const { data } = this.state;
    let members = data;

    return (
      <div>
        <button onClick={this.handleChange}>查詢</button>
        {members.map((item) => (
          <div key={item.rocId}>
            <div>
              <li>姓名: {item.fname}</li>
              <li>性別: {item.gender}</li>
              <li>Email: {item.email}</li>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Button;
