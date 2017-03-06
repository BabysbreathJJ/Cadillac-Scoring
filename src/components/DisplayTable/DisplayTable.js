/**
 * Created by Lijingjing on 17/2/26.
 */
import React, { Component } from 'react';
//import logo from './logo.svg';
import './DisplayTable.css';
import Picture from '../Picture/Picture'

class DisplayTable extends Component {
    constructor(props) {
        super(props);
        //this.handleChange = this.handleChange.bind(this);
        //this.state = {
        //    selectedItems: []
        //}
    }

    //handleChange(e) {
    //    var selectedItems = this.state.selectedItems;
    //    if (e.target.checked) {
    //        selectedItems.push(e.target.id);
    //        this.setState({selectedItems: selectedItems});
    //    }
    //    else {
    //        let index = this.state.selectedItems.indexOf(e.target.id);
    //        selectedItems.splice(index, 1);
    //        this.setState({selectedItems: selectedItems});
    //    }
    //    this.props.callbackParent(selectedItems);
    //
    //}


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
                    this.props.tableData.map((item, index)=>(
                        <tr key={index}>
                            {/*<td width="5%"><input id={item.id} type="checkbox" onChange={this.handleChange}/><label
                             htmlFor={item.id}>{item.id}</label></td>*/}
                            <td width="9%">{item.getIn(['region','module','name'])}</td>
                            <td width="9%">{item.getIn(['region','name'])}</td>
                            <td width="5%">{item.getIn(['score'])}</td>
                            <td width="16%">{item.getIn(['item'])}</td>
                            <td width="36%">
                                <pre>{item.getIn(['standard'])}</pre>
                            </td>
                            <td width="20%" style={pics}>
                                <div className="position-relative">

                                    {(item.picurl1) == null ? null : <Picture src={item.picurl1} edit="true"/>}
                                    {(item.picurl2) == null ? null : <Picture src={item.picurl2} edit="true"/>}
                                    {(item.picurl3) == null ? null : <Picture src={item.picurl3} edit="true"/>}

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
