/**
 * Created by Lijingjing on 17/2/26.
 */
import React, { Component } from 'react';
import './Add.css';
import DefaultPic from '../Picture/DefaultPic'
import '../Button/Button.css';
import Button from '../Button/Button';

class Add extends Component {
    constructor(props){
        super(props);
        this.handleModuleChange = this.handleModuleChange.bind(this);
        this.handleAreaChange = this.handleAreaChange.bind(this);
        this.state={
            module: '',
            area:'',
            point:'',
            evaluation:'',
            standard:'',
            pics:[],
            modules:['a','b','c','d'],
            areas:['A','B','C','D']
        };
    }

    handleModuleChange(e){
        console.log(e.target);
        console.log(e.target.value);
        this.setState({module: e.target.value});
    }

    handleAreaChange(e){
        this.setState({area: e.target.area});
        console.log(e.target.value);
    }

    render() {
        return (
            <div className="add-panel">
                <div>
                    <input type="text" className="display-none" style={{width:'58px'}}/>
                    <select value={this.state.module} onChange={this.handleModuleChange}>
                        {
                            this.state.modules.map((module,index)=>(
                                <option value={module} key={index}>{module}</option>
                            ))
                        }
                    </select>
                    <select value={this.state.area} onChange={this.handleAreaChange}>
                        {
                            this.state.areas.map((area,index)=>(
                                <option value={area} key={index}>{area}</option>
                            ))
                        }
                    </select>
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