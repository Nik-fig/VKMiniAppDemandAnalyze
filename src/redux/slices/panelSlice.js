import {createSlice} from '@reduxjs/toolkit';

let initialState = {
    activePanel: null,
};

const panelSlice = createSlice({
    name: 'panel',
    initialState: initialState,
    reducers: {
        setUpPanel: (state, action) => {
            state.activePanel = action.payload;
        }
    },

})
const {actions, reducer} = panelSlice;

export const {
    setUpPanel,
} = actions;

export {reducer as panelReducer};