/**
 * Created by Lijingjing on 17/2/26.
 */
import React, { Component } from 'react';
import './Add.css';
import DefaultPic from '../Picture/DefaultPic'
import '../Button/Button.css';
import Button from '../Button/Button';

class Add extends Component {
    render() {
        return (
            <div className="add-panel">
                <div>
                    <input type="text" className="display-none" style={{width:'58px'}}/>
                    <input type="text"/>
                    <input type="text"/>
                    <input type="text"/>
                    <input type="text" style={{width:'13.7%'}}/>
                    <textarea />
                    <div className="display-inline-block margin-pics">
                        <DefaultPic/>
                        <DefaultPic/>
                        <DefaultPic/>
                    </div>
                </div>
                <div className="display-right margin-right-10 margin-top-10">
                    <Button className="btn btn-green margin-left-0" icon="fa fa-plus fa-lg"/>
                    <Button className="btn btn-green" icon="fa fa-download fa-lg" name="保存"/>
                </div>
            </div>
        );
    }
}

export default Add;