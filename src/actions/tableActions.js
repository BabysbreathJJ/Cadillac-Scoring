/**
 * Created by Lijingjing on 17/2/28.
 */
// 这边引入了 fetch 的 polyfill，考以让旧的浏览器也可以使用 fetch
import 'whatwg-fetch';
// 引入 actionTypes 常数
import {
    GET_TABLE_DATA_INITIATE,
    GET_TABLE_DATA_SUCCESS,
    GET_TABLE_DATA_FAIL,
    UPDATE_TABLE_DATA_INITIATE,
    UPDATE_TABLE_DATA_SUCCESS,
    UPDATE_TABLE_DATA_FAIL,
    SELECT_ITEM,
    MODIFY_TABLE,
    DELETE_PIC,
    ADD_PIC,
    GO_LEFT_PAGE,
    GO_RIGHT_PAGE,
    GO_PAGE
} from '../constants/actionTypes';

// 引入 uiActions 的 action
import {
    showSpinner,
    hideSpinner,
} from './uiActions';

// 这边是这个范例的重点，要学习我们之前尚未讲解的非同步 action 处理方式：不同于一般同步 action 直接发送 action，非同步 action 会回传一个带有 dispatch 参数的 function，里面使用了 Ajax（这里使用 fetch()）进行处理
// 一般和 API 互动的流程：INIT（开始请求/秀出 spinner）-> COMPLETE（完成请求/隐藏 spinner）-> ERROR（请求失败）
// 这次我们虽然没有使用 redux-actions 但我们还是维持标准 Flux Standard Action 格式：{ type: '', payload: {} }

export const getTableData = (size, page) => {
    return (dispatch) => {
        dispatch({type: GET_TABLE_DATA_INITIATE});
        dispatch(showSpinner());
        fetch('http://112.74.49.183:8080/POSMPlatform/questions/bypage?size=' + size + '&page=' + page)
            .then(function (response) {
                return response.json()
            })
            .then(function (json) {
                dispatch({type: GET_TABLE_DATA_SUCCESS, payload: {data: json, pageNo: page}});
                dispatch(hideSpinner());
            })
            .catch(function (response) {
                dispatch({type: GET_TABLE_DATA_FAIL})
            });
    }
};

export const updateTableData = (updateItems)=> {
    let items = updateItems.toJS();
    return (dispatch)=> {
        dispatch({type: UPDATE_TABLE_DATA_INITIATE});
        dispatch(showSpinner());
        fetch('http://112.74.49.183:8080/POSMPlatform/questions', {
            method: "PATCH",
            header: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify({data: items}),
            mode: "cors"
        })
            .then(function (response) {
                return response.json()
            })
            .then(function (json) {
                dispatch({type: UPDATE_TABLE_DATA_SUCCESS, payload: json})
            })
            .catch(function (response) {
                dispatch({type: UPDATE_TABLE_DATA_FAIL})
            });
    }

};


// 同步 actions 处理，回传 action 物件
export const selectItem = (tr, text, value)=>({type: SELECT_ITEM, payload: {tr: tr, itemId: text, value: value}});
export const modifyTable = (tr, value)=>({type: MODIFY_TABLE, payload: {tr: tr, value: value}});
export const goLeftPage = (pageNo)=>({type: GO_LEFT_PAGE, payload: {pageNo: pageNo}});
export const goRightPage = (pageNo)=>({type: GO_RIGHT_PAGE, payload: {pageNo: pageNo}});
export const goPage = (pageNo)=>({type: GO_PAGE, payload: {pageNo: pageNo}});

