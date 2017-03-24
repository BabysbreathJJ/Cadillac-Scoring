/**
 * Created by Lijingjing on 17/2/24.
 */
import React, { Component } from 'react';
import './EditTable.css';
import Picture from '../Picture/Picture'
import DefaultPic from '../Picture/DefaultPic'
import FileDropzone from '../Add/FileDropzone'

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
            selectedItems: {},
            submitResult: [],
            items: this.props.items
        }
    }

    handleChange(item, e) {

        var selectedItems = this.state.selectedItems;
        //var submitResult = this.state.submitResult;

        //console.log(submitResult);

        //var foundIndex = this.state.submitResult.findIndex(x=>x.id == e.target.id);

        if (e.target.checked) {
            selectedItems[e.target.id] = e.target.id;
        }
        else {
            delete selectedItems[e.target.id];
        }
        this.setState({selectedItems: selectedItems});

        //var updateItems = {selectedItems: selectedItems, submitResult: submitResult};
        //this.props.callbackParent(updateItems);
        this.props.callbackParent(item, e);

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
                            <td width="7%"><input id={item.id} type="checkbox"
                                                  checked={this.state.selectedItems[item.id]?true: false}
                                                  onChange={this.handleChange.bind(this,item)}/><label
                                htmlFor={item.id}>{(index + 1) + ((this.props.pageno - 1)) * 10}</label></td>
                            <td width="7%">
                                {/*<input type="text" value={item.region.module.name}
                                 onChange={(event) => this.props.changeContent(2, index, event.target.value)}/>*/}
                                <select  onChange={(event) => this.props.changeContent(2, index, event.target.value)} value={item.region.module.id}>
                                    {

                                        this.props.allModules.map((option, optionIndex)=>(
                                            <option key={optionIndex} value={option.id} selected={item.region.module.id == option.id}>
                                                {option.name}
                                            </option>
                                        ))
                                    }
                                </select>
                            </td>
                            <td width="7%">
                                <select name="region" onChange={(event) => this.props.changeContent(3, index, event.target.value)} value={item.region.id}>
                                    {

                                        this.props.allRegions['1'].map((option, optionIndex)=>(
                                            <option key={optionIndex} value={option.id} selected={item.region.id == option.id}>
                                                {option.name}
                                            </option>
                                        ))
                                    }
                                </select>


                            </td>
                            <td width="7%"><input type="text" value={item.score}
                                                  onChange={(event) => this.props.changeContent(4, index, event.target.value)}/>
                            </td>
                            <td width="16%"><input type="text" value={item.item}
                                                   onChange={(event) => this.props.changeContent(5, index, event.target.value)}/>
                            </td>
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

                                        {
                                            (item.picurl1 == '' || item.picurl1 == null) ?
                                                <FileDropzone uploadImage={this.props.uploadImage} addr="picurl1"
                                                              src={item.picurl1}
                                                              onChange={(event) => this.props.changeContent(7, index)}
                                                              index={index}/> : <Picture addr="picurl1"
                                                                                         src={item.picurl1}
                                                                                         edit="true"
                                                                                         deletePic={this.props.deletePic}
                                                                                         index={index}/>
                                        }

                                        {
                                            (item.picurl2 == '' || item.picurl2 == null) ?
                                                <FileDropzone uploadImage={this.props.uploadImage} addr="picurl1"
                                                              src={item.picurl2}
                                                              onChange={(event) => this.props.changeContent(8, index)}
                                                              index={index}/> : <Picture addr="picurl2"
                                                                                         src={item.picurl2}
                                                                                         edit="true"
                                                                                         deletePic={this.props.deletePic}
                                                                                         index={index}/>
                                        }

                                        {
                                            (item.picurl3 == '' || item.picurl3 == null) ?
                                                <FileDropzone uploadImage={this.props.uploadImage} addr="picurl3"
                                                              src={item.picurl3}
                                                              onChange={(event) => this.props.changeContent(9, index)}
                                                              index={index}/> : <Picture addr="picurl3"
                                                                                         src={item.picurl3}
                                                                                         edit="true"
                                                                                         deletePic={this.props.deletePic}
                                                                                         index={index}/>
                                        }


                                        {/* <FileDropzone uploadImage={this.props.uploadImage} addr="picurl2"
                                         src={item.picurl2}
                                         deletePic={this.props.deletePic}
                                         onChange={(event) => this.props.changeContent(8, index)}
                                         index={index}/>
                                         <FileDropzone uploadImage={this.props.uploadImage} addr="picurl3"
                                         src={item.picurl3}
                                         deletePic={this.props.deletePic}
                                         onChange={(event) => this.props.changeContent(9, index)}
                                         index={index}/> */}
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
