/**
 * Created by Lijingjing on 17/3/1.
 */
import Immutable from 'immutable';

export const UiState = Immutable.fromJS({
    spinnerVisible: false
});

export const TabledataState = Immutable.fromJS({
    userId: '',
    tableData: [],
    selectedItems: [],
    updateItems: [],
    item: {},
    totalPages: '',
    currentPage: 1,
    startPage: 1
});

