/**
 * Created by Lijingjing on 17/2/28.
 */
import { handleActions } from 'redux-actions';
import { TabledataState } from '../../constants/models';


//import {
//    GET_TABLE_DATA_SUCCESS,
//    UPDATE_TABLE_DATA_INITIATE,
//    UPDATE_TABLE_DATA_SUCCESS,
//    UPDATE_TABLE_DATA_FAIL,
//    SELECT_ITEM,
//    MODIFY_TABLE
//} from '../../constants/actionTypes';

const tableReducers = handleActions({
    // 当使用者按送出按钮，发出 GET_GITHUB_SUCCESS action 时将接收到的资料 merge
    GET_TABLE_DATA_SUCCESS: (state, { payload }) => {

        return state.merge({
            'tableData': payload.data.data,
            'totalPages': payload.data.totalpages,
            'currentPage': payload.pageNo
        })
    },
    SELECT_ITEM: (state, {payload})=> {
        if (payload.value) {
            let tds = payload.tr.cells;

            const selectedItem = {
                id: payload.itemId,
                region: {
                    name: tds[2].firstChild.value,
                    module: {name: tds[1].firstChild.value}
                },
                score: tds[3].firstChild.value,
                item: tds[4].firstChild.value,
                standard: tds[5].firstChild.value,
                picurl1: tds[6].getElementsByTagName('img')[0] === undefined ? '' : tds[6].getElementsByTagName('img')[0],
                picurl2: tds[6].getElementsByTagName('img')[1] === undefined ? '' : tds[6].getElementsByTagName('img')[1],
                picurl3: tds[6].getElementsByTagName('img')[2] === undefined ? '' : tds[6].getElementsByTagName('img')[2]
            };

            return state.update('selectedItems', selectedItems => selectedItems.concat(selectedItem));
        }
        else {
            return state.update('selectedItems', selectedItems => selectedItems.splice(selectedItems.findIndex(function (ele) {
                return ele.id === payload.itemId
            }), 1))
        }

    },
    UPDATE_TABLE_DATA_SUCCESS: (state, {payload})=> {
        window.location.reload();
    },
    MODIFY_TABLE: (state, {payload})=> {

        var tds = payload.tr.cells;
        if (tds[0].firstChild.checked) {
            let id = Number(tds[0].firstChild.getAttribute("id"));
            console.log(typeof(id));
            let foundIndex = state.getIn(['selectedItems']).findIndex(x=>x.id === id);
            const selectedItem = {
                id: id,
                region: {
                    name: tds[2].firstChild.value,
                    module: {name: tds[1].firstChild.value}
                },
                score: Number(tds[3].firstChild.value),
                item: tds[4].firstChild.value,
                standard: tds[5].firstChild.value,
                picurl1: tds[6].getElementsByTagName('img')[0] === undefined ? '' : tds[6].getElementsByTagName('img')[0],
                picurl2: tds[6].getElementsByTagName('img')[1] === undefined ? '' : tds[6].getElementsByTagName('img')[1],
                picurl3: tds[6].getElementsByTagName('img')[2] === undefined ? '' : tds[6].getElementsByTagName('img')[2]
            };


            return state.update('selectedItems', selectedItems => selectedItems.splice(foundIndex, 1, selectedItem));
        }
        else {

            return state;
        }
    },
    GO_LEFT_PAGE: (state, {payload})=> {
        let currentPage = payload.pageNo;
        let prevPage = (currentPage - 1) > 0 ? (currentPage - 1) : 1;
        let startPage = state.getIn(['startPage']);

        if (prevPage < startPage) {
            startPage -= 5;
        }
        return state.merge({
            'startPage': startPage
        })
    },
    GO_RIGHT_PAGE: (state, {payload})=> {
        let currentPage = payload.pageNo;
        let nextPage = (currentPage + 1) > state.getIn(['totalPages']) ? (currentPage) : (currentPage + 1);
        let startPage = state.getIn(['startPage']);

        if (nextPage >= (startPage + 5)) {
            //if ((startPage + 5) < state.getIn(['totalPages'])) {
            startPage = startPage + 5;
            //}
        }
        return state.merge({
            'startPage': startPage
        })
    }
}, TabledataState);

export default tableReducers;