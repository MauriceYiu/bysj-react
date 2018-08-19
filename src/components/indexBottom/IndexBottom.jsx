import React, { Component } from 'react';
import "./indexBottom.scss";

class IndexBottom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: 0
        };
    }
    render() {
        let { key } = this.state;
        return (
            <div id="index-bottom">
                <ul>
                    <li key={"0"} className={key === 0 ? "active" : ""} onClick={() => this.setState({ key: 0 })} >
                        <i className="iconfont icon-shouye"></i>
                    </li>
                    <li key={"1"} className={key === 1 ? "active" : ""} onClick={() => this.setState({ key: 1 })} >
                        <i className="iconfont icon-liuyan"></i>
                    </li>
                    <li key={"2"} className={key === 2 ? "active" : ""} onClick={() => this.setState({ key: 2 })} >
                        <i className="iconfont icon-wode"></i>
                    </li>
                </ul>
            </div>
        );
    }
}

export default IndexBottom;