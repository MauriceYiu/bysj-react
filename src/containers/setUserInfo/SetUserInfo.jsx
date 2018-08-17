import React, { Component } from 'react';
import "./setUserInfo.scss";
import gtq from "./../../static/images/gtq.png";
import xd from "./../../static/images/xd.png";
import xer from "./../../static/images/xer.png";

class SetUserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: 0
        };
    }
    render() {
        let { key } = this.state;
        return (
            <div id="set-user-info">
                <p>请选择您的头像</p>
                <div className="user-avatar">
                    <ul>
                        <li onClick={()=>this.setState({ key: 0 })} className={key === 0 ? "show-color" : ""}>
                            <img src={gtq} alt="" />
                        </li>
                        <li onClick={()=>this.setState({ key: 1 })} className={key === 1 ? "show-color" : ""}>
                            <img src={xd} alt="" />
                        </li>
                        <li onClick={()=>this.setState({ key: 2 })} className={key === 2 ? "show-color" : ""}>
                            <img src={xer} alt="" />
                        </li>
                    </ul>
                </div>
                <div className="user-info">
                    <div className="job-info">
                        <p>请输入求职信息（岗位）</p>
                        <input type="text" placeholder="请输入所求岗位信息..." name="job" />
                    </div>
                    <div className="self-introduction">
                        <p>请输入个人介绍</p>
                        <textarea placeholder="请介绍自己..."></textarea>
                    </div>
                </div>
                <div className="save">
                    <button>保存</button>
                </div>
            </div>
        );
    }
}

export default SetUserInfo;