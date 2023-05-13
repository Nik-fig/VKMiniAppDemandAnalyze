import {createSlice} from '@reduxjs/toolkit';

let initialState = {
    selectedCommunityId: null,
    selectedProductId: null,
};

const demandQuerySlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUpCommunity: (state, action) => {
            state.selectedCommunityId = action.payload;
        }
    },

})
const {actions, reducer} = demandQuerySlice;

export const {
    setUpCommunity
} = actions;

export {reducer as demandQueryReducer};