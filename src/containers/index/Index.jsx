import React, { Component } from 'react';
import "./index.scss";
import IndexHeader from "./../../components/indexHeader/IndexHeader";
import IndexBottom from "./../../components/indexBottom/IndexBottom";

class Index extends Component {
    render() {
        return (
            <div id="index">
                <IndexHeader />
                <IndexBottom />
            </div>
        );
    }
}

export default Index;