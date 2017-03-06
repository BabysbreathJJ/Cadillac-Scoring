/**
 * Created by Lijingjing on 17/2/28.
 */
import { combineReducers } from 'redux-immutable';
import ui from './ui/uiReducers';
import tabledata from './data/tableReducers';
//import { reducer as form } from 'redux-form'

const rootReducer = combineReducers({
    ui,
    tabledata
});

export default rootReducer;