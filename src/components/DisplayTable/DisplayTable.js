/**
 * Created by Lijingjing on 17/2/26.
 */
import React, { Component } from 'react';
//import logo from './logo.svg';
import './DisplayTable.css';
import Picture from '../Picture/Picture'
import DefaultPic from '../Picture/DefaultPic'

class DisplayTable extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.items);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            selectedItems: {}
        }
    }

    handleChange(e) {
        var selectedItems = this.state.selectedItems;
        if (e.target.checked) {
            selectedItems[e.target.id]= e.target.id;
            e.target.checked=true;
            this.setState({selectedItems: selectedItems});
        }
        else {
           if(selectedItems[e.target.id]){
               delete selectedItems[e.target.id];
           }
            this.setState({selectedItems: selectedItems});
        }
        this.props.callbackParent(selectedItems);

    }


    render() {
        const pics = {
            padding: '5px 0px'
        };
        return (

            <table>
                <thead>
                <tr>
                    {
                        this.props.ths.map((th, index)=>(
                            <th key={index}>{th}</th>
                        ))
                    }
                </tr>
                </thead>
                <tbody>
                {
                    this.props.items.map((item, index)=>(
                        <tr key={index}>
                            <td width="7%"><input id={item.id} type="checkbox" checked={this.state.selectedItems[item.id]?true: false} onChange={this.handleChange}/><label
                                htmlFor={item.id}>{item.id}</label></td>
                            <td width="7%">{item.region.module.name}</td>
                            <td width="7%">{item.region.name}</td>
                            <td width="7%">{item.score}</td>
                            <td width="16%">{item.item}</td>
                            <td width="36%">
                                <pre>{item.standard}</pre>
                            </td>
                            <td width="20%" style={pics}>
                                <div className="position-relative">
                                    <Picture src={item.picurl1}/>
                                    <Picture src={item.picurl2}/>
                                    <Picture src={item.picurl3}/>

                                </div>
                            </td>
                        </tr>
                    ))

                }
                </tbody>
            </table>
        );
    }
}

export default DisplayTable;
