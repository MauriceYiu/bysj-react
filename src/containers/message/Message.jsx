import React, { Component } from 'react';
import IndexHeader from "./../../components/indexHeader/IndexHeader";
import IndexBottom from "./../../components/indexBottom/IndexBottom";

class Message extends Component {
    render() {
        let router = this.props.history;
        return (
            <div id="message">
                <IndexHeader titName="消息列表" />
                <IndexBottom nowKey={1} history={router} />
            </div>
        );
    }
}

export default Message;