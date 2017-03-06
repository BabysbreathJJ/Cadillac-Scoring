/**
 * Created by Lijingjing on 17/2/28.
 */
import {connect} from 'react-redux';
import Edit from '../components/Edit/Edit';

import{
    selectItem,
    getTableData,
    updateTableData,
    modifyTable,
    goLeftPage,
    goRightPage,
    goPage
} from '../actions';


export default connect(
    (state) => ({
        selectedItems: state.getIn(['tabledata', 'selectedItems']),
        updateItems: state.getIn(['tabledata', 'updateItems']),
        tableData: state.getIn(['tabledata', 'tableData']),
        totalPages: state.getIn(['tabledata', 'totalPages']),
        currentPage: state.getIn(['tabledata', 'currentPage']),
        startPage: state.getIn(['tabledata', 'startPage']),
        ths: ['', '模块', '区域', '分值', '评价项目', '评价标准', '标准照片']
    }),
    (dispatch) => ({
        onSelectItem: (event) => (
            dispatch(selectItem(event.target.parentNode.parentNode, event.target.id, event.target.checked))
        ),
        getTableData: (size, page)=>(
            dispatch(getTableData(size, page))
        ),
        updateTableData: (updateItems)=> (
            dispatch(updateTableData(updateItems))
        ),
        onModifyTable: (event)=>(
            dispatch(modifyTable(event.target.parentNode.parentNode, event.target.value))
        ),
        goPage: (size, pageNo)=> (
            //dispatch(goPage(pageNo));
            dispatch(getTableData(size, pageNo))
        ),
        goLeftPage: (size, pageNo, preNo)=> {
            dispatch(goLeftPage(pageNo));
            dispatch(getTableData(size, preNo));
        },
        goRightPage: (size, pageNo, nextNo)=> {
            dispatch(goRightPage(pageNo));
            dispatch(getTableData(size, nextNo));
        }
    }),
    (stateProps, dispatchProps, ownProps) => {
        const { selectedItems,updateItems,tableData,ths } = stateProps;
        const { onSelectItem,getTableData,updateTableData, onModifyTable, goPage,goLeftPage,goRightPage } = dispatchProps;
        return Object.assign({}, stateProps, dispatchProps, ownProps);
    }
)(Edit);