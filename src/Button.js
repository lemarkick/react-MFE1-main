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
    /*
    fetch("http://localhost:5555/items?rocId=" + target, {
      method: "GET",
    })*/
    fetch("https://healthcare-bysean.herokuapp.com/viewprofile/" + target, {
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
        this.setState({
          data: [],
        });
        console.error(err);
      });
  };

  render() {
    const { data } = this.state;
    let members = data;
    let comp;

    if (members.id) {
      comp = (
        <>
          <button onClick={this.handleChange}>查詢</button>
          <div key={members.id}>
            <div>
              <li>姓名: {members.username1}</li>
              <li>手機: {members.user_mobile}</li>
              <li>縣市: {members.location}</li>
            </div>
          </div>
        </>
      );
    } else {
      comp = (
        <>
          <button onClick={this.handleChange}>查詢</button>
        </>
      );
    }

    return <div>{comp}</div>;

    /*
    return (
      <div>
        <button onClick={this.handleChange}>查詢</button>
        {members.map((item) => (
          <div key={item.id}>
            <div>
              <li>姓名: {item.username1}</li>
              <li>手機: {item.user_mobile}</li>
              <li>縣市: {item.location}</li>
            </div>
          </div>
        ))}
      </div>
    );
    */
  }
}

export default Button;
