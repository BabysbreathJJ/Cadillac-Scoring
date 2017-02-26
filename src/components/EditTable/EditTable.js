/**
 * Created by Lijingjing on 17/2/24.
 */
import React, { Component } from 'react';
import './EditTable.css';
import Picture from '../Picture/Picture'
import DefaultPic from '../Picture/DefaultPic'

class EditTable extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleStandardChange = this.handleStandardChange.bind(this);
        //this.handleModuleChange = this.handleModuleChange.bind(this);
        this.handleAreaChange = this.handleAreaChange.bind(this);
        this.handlePointChange = this.handlePointChange.bind(this);
        this.handleEvaluateChange = this.handleEvaluateChange.bind(this);
        this.state = {
            selectedItems: [],
            submitResult: []
        }
    }

    handleChange(e) {
        var selectedItems = this.state.selectedItems;
        var submitResult = this.state.submitResult;
        if (e.target.checked) {
            selectedItems.push(e.target.id);
            if (this.state.submitResult[e.target.id]) {
                submitResult[e.target.id].id = e.target.id;
            }
            else {
                submitResult[e.target.id]={};
                submitResult[e.target.id].id = e.target.id;
            }

            this.setState({selectedItems: selectedItems});
            this.setState({submitResult: submitResult});
        }
        else {
            let index = this.state.selectedItems.indexOf(e.target.id);
            selectedItems.splice(index, 1);
            delete submitResult[e.target.id];
            this.setState({selectedItems: selectedItems});
            this.setState({submitResult: submitResult});
        }
        var updateItems = {selectedItems: selectedItems,submitResult:submitResult};
        this.props.callbackParent(updateItems);

    }


    handleModuleChange(id, e) {
        //console.log(e.target.value);
        //console.log(id);
        if (this.state.submitResult[id]) {
            this.state.submitResult[id].module = e.target.value;
        }
        else {
            this.state.submitResult[id] = {};
            this.state.submitResult[id].id = id;
            this.state.submitResult[id].module = e.target.value;
        }

        this.setState({submitResult: this.state.submitResult});

    }

    handleAreaChange(e) {
        console.log(e.target.value);
    }

    handlePointChange(e) {
        console.log(e.target.value);
    }

    handleEvaluateChange(e) {
        console.log(e.target.value);
    }

    handleStandardChange(e) {
        console.log(e.target.value);
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
                            <td width="7%"><input type="text" defaultValue={item.module}
                                                  onChange={this.handleModuleChange.bind(this,item.id)}/></td>
                            <td width="7%"><input type="text" defaultValue={item.area}
                                                  onChange={this.handleAreaChange}/></td>
                            <td width="7%"><input type="text" defaultValue={item.point}
                                                  onChange={this.handlePointChange}/></td>
                            <td width="16%"><input type="text" defaultValue={item.evaluateItem}
                                                   onChange={this.handleEvaluateChange}/></td>
                            <td width="36%">
                                <textarea
                                    onChange={this.handleStandardChange}
                                    defaultValue={item.evaluateStandard}/>
                            </td>
                            <td width="20%" style={pics}>
                                <div className="position-relative">
                                    {(function (rows, len) {
                                        while (rows.length < len) {
                                            rows.push(<DefaultPic key={rows.length}/>)
                                        }
                                        return rows;
                                    })([], 3)}
                                    <div className="pics">
                                        {
                                            item.pictures.map((picture, index)=>(
                                                <Picture src={picture} key={index} edit="true"/>

                                            ))
                                        }
                                    </div>
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

export default EditTable;
