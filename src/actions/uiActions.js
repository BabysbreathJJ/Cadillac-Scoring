/**
 * Created by Lijingjing on 17/2/28.
 */
import { createAction } from 'redux-actions';
import {
    SHOW_SPINNER,
    HIDE_SPINNER,
} from '../constants/actionTypes';

// 同步 actions 处理，回传 action 物件
export const showSpinner = () => ({ type: SHOW_SPINNER});
export const hideSpinner = () => ({ type: HIDE_SPINNER});