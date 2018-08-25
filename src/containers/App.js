import React, { Component } from 'react';
import './App.scss';
import {withRouter} from "react-router-dom";

import {connect} from "react-redux";
import { updateMsgList } from "./../actions"

class App extends Component {
  render() {
    return (
      <div className="App">
          {this.props.children}
      </div>
    );
  }
  componentDidMount(){
    let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    if(userInfo){
      this.props.updateMsgList(userInfo);
    }else{
      this.props.history.push("/login");
    }
  }
}

export default withRouter(connect(
  state =>({user:state.user}),
  { updateMsgList }
)(App));