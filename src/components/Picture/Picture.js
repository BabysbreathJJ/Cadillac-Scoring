/**
 * Created by Lijingjing on 17/2/26.
 */
import React, { Component } from 'react';
//import logo from './logo.svg';
import './Picture.css';

class Picture extends Component {

    constructor(props) {
        super(props);
        this.deletePic = this.deletePic.bind(this);
    }

    deletePic = function () {
        this.props.deletePic(this.props.index, this.props.addr);
    };

    render() {
        return (
            <div className="display-inline-block pic">
                { this.props.src ? <img src={this.props.src}/> : null}
                { this.props.edit ? <i className="fa fa-minus-circle delete-icon"
                                       onClick={this.deletePic}/> : null }
            </div>
        );
    }
}

export default Picture;
