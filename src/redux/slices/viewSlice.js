import {createSlice} from '@reduxjs/toolkit';

let initialState = {
    activeView: null,
};

const viewSlice = createSlice({
    name: 'view',
    initialState: initialState,
    reducers: {
        setUpView: (state, action) => {
            state.activeView = action.payload;
        },
    },

})
const {actions, reducer} = viewSlice;

export const {
    setUpView,
} = actions;

export {reducer as viewReducer};