/**
 * Created by Lijingjing on 17/2/28.
 */
import {connect} from 'react-redux';
import Display from '../components/Display/Display';

import{
    goLeftPage,
    goRightPage,
    goPage,
    getTableData
} from '../actions';


export default connect(
    (state) => ({
        selectedItems: state.getIn(['tabledata', 'selectedItems']),
        updateItems: state.getIn(['tabledata', 'updateItems']),
        tableData: state.getIn(['tabledata', 'tableData']),
        totalPages: state.getIn(['tabledata', 'totalPages']),
        currentPage: state.getIn(['tabledata', 'currentPage']),
        startPage: state.getIn(['tabledata', 'startPage']),
        ths: ['模块', '区域', '分值', '评价项目', '评价标准', '标准照片']
    }),
    (dispatch) => ({
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
        const { onSelectItem,getTableData,updateTableData, onModifyTable, goPage } = dispatchProps;
        return Object.assign({}, stateProps, dispatchProps, ownProps);
    }
)(Display);