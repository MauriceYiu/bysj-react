import React, { Component } from 'react';
import './App.scss';
//引入socket
import io from 'socket.io-client';

class App extends Component {
  render() {
    return (
      <div className="App">
        {this.props.children}
      </div>
    );
  }
  componentDidMount(){
    // 1. 创建对象之前: 判断对象是否已经存在, 只有不存在才去创建
    if (!io.socket) {
        // 连接服务器, 得到与服务器的连接对象
        io.socket = io('ws://localhost:3009'); // 2. 创建对象之后: 保存对象
    }
  }
}

export default App;