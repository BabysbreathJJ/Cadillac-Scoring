/**
 * Created by Lijingjing on 17/2/26.
 */
import React, { Component } from 'react';
//import logo from './logo.svg';
import './Picture.css';

class Picture extends Component {
    render() {
        return (
            <div className="display-inline-block pic">
                { this.props.src ?<img src={process.env.PUBLIC_URL+this.props.src} alt="标准图片"/> : null}
                { this.props.edit ? <i className="fa fa-minus-circle delete-icon"></i> : null }
            </div>
        );
    }
}

export default Picture;
