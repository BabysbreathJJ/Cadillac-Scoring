/**
 * Created by Lijingjing on 17/2/26.
 */
import React, { Component } from 'react';
import Button from '../Button/Button';
import EditTable from '../EditTable/EditTable';
import '../EditTable/EditTable.css';
import '../Button/Button.css';
import './Edit.css';
import {Link} from 'react-router';
import Page from '../Page/Page'
import '../Page/Page.css'


class Edit extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        //this.props.getTableData(9, 1);
        this.props.goPage(9, this.props.params.page);
    }


    render() {
        return (
            <div className="display-panel">
                <div>
                    <Button className="btn btn-green margin-left-0" icon="fa fa-trash fa-lg"/>
                    <Link className="edit-link" to={{pathname:'/display'}}> <Button className="btn btn-green"
                                                                                    icon="fa fa-pencil-square-o fa-lg"/></Link>
                    <Button className="btn btn-green" icon="fa fa-external-link fa-lg" name="提交"
                            onClick={this.props.updateTableData.bind(this,this.props.selectedItems)}
                    />
                    <Button className="btn btn-red float-right" icon="fa fa-pencil-square-o fa-lg" name="增加一题"/>
                </div>
                <EditTable ths={this.props.ths} tableData={this.props.tableData} initialValues={this.props.tableData}
                           onSelectItem={this.props.onSelectItem} onModifyTable={this.props.onModifyTable}/>
                <Page currentPage={this.props.currentPage} goPage={this.props.goPage} goLeftPage={this.props.goLeftPage}
                      goRightPage={this.props.goRightPage}
                      totalPages={this.props.totalPages} startPage={this.props.startPage}/>
            </div>
        )

    }

}


export default Edit;
