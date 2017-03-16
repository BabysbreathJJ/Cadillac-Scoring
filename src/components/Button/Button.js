/**
 * Created by Lijingjing on 17/2/24.
 */
import React, { Component } from 'react';
import './Button.css';

class Button extends Component {
    render() {
        return (
            <button {...this.props}><i className={this.props.icon} name={this.props.name}><span name={this.props.name} className={(this.props.name)?"operation":""}>{this.props.name}</span></i></button>
        );
    }
}

export default Button;
