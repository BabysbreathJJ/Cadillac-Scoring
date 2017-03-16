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
        this.handleModuleChange = this.handleModuleChange.bind(this);
        this.handleAreaChange = this.handleAreaChange.bind(this);
        this.handlePointChange = this.handlePointChange.bind(this);
        this.handleEvaluateChange = this.handleEvaluateChange.bind(this);
        this.state = {
            selectedItems: [],
            submitResult: [],
            items: this.props.items
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


    handleModuleChange(index, e) {
        //console.log(e.target.value);
        //console.log(id);
        var items = this.state.items;
        items[index].region.module.name = e.target.value;
        this.setState({
            items: items
        });

    }

    handleAreaChange(e, index) {

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
                            <td width="7%"><input type="text" value={item.region.module.name}
                                                  onChange={(event) => this.props.changeContent(2, index, event.target.value)}/></td>
                            <td width="7%"><input type="text" value={item.region.name}
                                                  onChange={(event) => this.props.changeContent(3, index, event.target.value)}/></td>
                            <td width="7%"><input type="text" value={item.score}
                                                  onChange={(event) => this.props.changeContent(4, index, event.target.value)}/></td>
                            <td width="16%"><input type="text" value={item.item}
                                                   onChange={(event) => this.props.changeContent(5, index, event.target.value)}/></td>
                            <td width="36%">
                                <textarea
                                    onChange={(event) => this.props.changeContent(6, index, event.target.value)}
                                    value={item.standard}/>
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
                                        <Picture src={item.picurl1}/>
                                        <Picture src={item.picurl2}/>
                                        <Picture src={item.picurl3}/>
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
