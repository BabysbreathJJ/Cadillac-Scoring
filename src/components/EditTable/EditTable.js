/**
 * Created by Lijingjing on 17/2/24.
 */
import React,{Component} from 'react';
import './EditTable.css';
import Picture from '../Picture/Picture';
import DefaultPic from '../Picture/DefaultPic';
//import { Field, reduxForm } from 'redux-form';


class EditTable extends Component {


    render() {
        return (
            <div>
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
                            <tr key={index} className="editTable">
                                <td width="2%"><input id={item.getIn(['id'])} type="checkbox"
                                                      onChange={this.props.onSelectItem.bind(this)}/></td>
                                {/* <!--<label htmlFor={item.id}>{item.getIn(['id'])}</label>-->*/}
                                <td width="10%"><input type="text" name="module"
                                                       defaultValue={item.getIn(['region','module','name'])}
                                                       onChange={this.props.onModifyTable.bind(this)}
                                /></td>


                                <td width="10%"><input type="text" name="region"
                                                       defaultValue={item.getIn(['region','name'])}
                                                       onChange={this.props.onModifyTable.bind(this)}
                                /></td>
                                <td width="5%"><input type="text" name="score" defaultValue={item.getIn(['score'])}
                                                      onChange={this.props.onModifyTable.bind(this)}
                                /></td>
                                <td width="17%"><input type="text" name="item" defaultValue={item.getIn(['item'])}
                                                       onChange={this.props.onModifyTable.bind(this)}
                                /></td>
                                <td width="36%">
                                    <textarea name="standard" onChange={this.props.onModifyTable.bind(this)}
                                              defaultValue={item.getIn(['standard'])}/>
                                </td>
                                <td width="20%" style={{padding: '5px 0px'}}>
                                    <div className="position-relative">
                                        {(function (rows, len) {
                                            while (rows.length < len) {
                                                rows.push(<DefaultPic key={rows.length}/>)
                                            }
                                            return rows;
                                        })([], 3)}
                                        <div className="pics">
                                            {(item.picurl1) == null ? null : <Picture src={item.picurl1} edit="true"/>}
                                            {(item.picurl2) == null ? null : <Picture src={item.picurl2} edit="true"/>}
                                            {(item.picurl3) == null ? null : <Picture src={item.picurl3} edit="true"/>}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }


                    </tbody>

                </table>
            </div>
        )
    }
}

export default (EditTable);
