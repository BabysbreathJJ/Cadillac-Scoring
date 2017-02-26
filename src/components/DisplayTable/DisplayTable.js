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
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            selectedItems: []
        }
    }

    handleChange(e) {
        var selectedItems = this.state.selectedItems;
        if (e.target.checked) {
            selectedItems.push(e.target.id);
            this.setState({selectedItems: selectedItems});
        }
        else {
            let index = this.state.selectedItems.indexOf(e.target.id);
            selectedItems.splice(index, 1);
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
                            <td width="7%"><input id={item.id} type="checkbox" onChange={this.handleChange}/><label
                                htmlFor={item.id}>{item.id}</label></td>
                            <td width="7%">{item.module}</td>
                            <td width="7%">{item.area}</td>
                            <td width="7%">{item.point}</td>
                            <td width="16%">{item.evaluateItem}</td>
                            <td width="36%">
                                <pre>{item.evaluateStandard}</pre>
                            </td>
                            <td width="20%" style={pics}>
                                <div className="position-relative">
                                        {
                                            item.pictures.map((picture, index)=>(
                                                <Picture src={picture} key={index}/>

                                            ))
                                        }
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
