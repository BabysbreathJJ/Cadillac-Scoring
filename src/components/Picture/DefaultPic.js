/**
 * Created by Lijingjing on 17/2/26.
 */
import React, { Component } from 'react';
//import logo from './logo.svg';
import './Picture.css';

class DefaultPic extends Component {
    render() {
        return (
            <div className="display-inline-block">
                <div className="display-inline-block pic-default"><i className="fa fa-camera fa-lg icon-center"></i></div>
            </div>
        );
    }
}

export default DefaultPic;