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
        let { isShowBack } = this.props;
        return (
            <div id="index-header">
                {
                    isShowBack ? (
                        <span className="back"><i className="iconfont icon-fanhui"></i></span>
                    ) : ("")
                }
                <span>{titName}</span>
            </div>
        );
    }
    componentDidMount() {
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        let propsInfo = this.props;
        console.log(propsInfo)
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