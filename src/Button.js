import React, { useState } from "react";
import { ReactComponentElement } from "react";

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isValid: false,
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
          isValid: true,
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
          isValid: false,
          data: [],
        });
        alert("請確認輸入的帳號是否有誤");
        console.error(err);
      });
  };

  render() {
    const { data, isValid } = this.state;
    let members = data;
    let comp;

    if (isValid) {
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
