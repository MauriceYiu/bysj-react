import React, { Component } from 'react';
import "./indexBottom.scss";

class IndexBottom extends Component {
    constructor(props) {
        super(props);
        this.state={};
    }
    render() {
        const { history, nowKey } = this.props;
        return (
            <React.Fragment>
                <div id="index-bottom">
                    <ul>
                        <li key={"0"} className={nowKey === 0 ? "active" : ""} onClick={() => { history.push("/index") }} >
                            <i className="iconfont icon-shouye"></i>
                        </li>
                        <li key={"1"} className={nowKey === 1 ? "active" : ""} onClick={() => { history.push("/message") }} >
                            <i className="iconfont icon-liuyan"></i>
                        </li>
                        <li key={"2"} className={nowKey === 2 ? "active" : ""} onClick={() => { history.push("/message") }} >
                            <i className="iconfont icon-wode"></i>
                        </li>
                    </ul>
                </div>
                <div className="clear-bottom"></div>
            </React.Fragment>
        );
    }
}

export default IndexBottom;