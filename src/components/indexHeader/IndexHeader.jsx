import React, { Component } from 'react';
import "./indexHeader.scss";

class IndexHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titName: "加载中..."
        };
    }
    render() {
        let { titName } = this.state;
        let { isShowBack, history } = this.props;
        return (
            <React.Fragment>
            <div id="index-header">
                {
                    isShowBack ? (
                        <span className="back" onClick={() => history.go(-1)}><i className="iconfont icon-fanhui"></i></span>
                    ) : ("")
                }
                <span>{titName}</span>
            </div>
            <div className="clear-header"></div>
            </React.Fragment>
        );
    }
    componentDidMount() {
        let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
        let propsInfo = this.props;
        this.setState({
            titName: propsInfo.titName ? (propsInfo.titName) : (userInfo.type === "qiuzhi" ? "企业招聘" : "求职列表")
        });
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }
}

export default IndexHeader;