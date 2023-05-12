import {createSlice} from '@reduxjs/toolkit';

let initialState = {
    activeModal: null,
};

const modalSlice = createSlice({
    name: 'modal',
    initialState: initialState,
    reducers: {
        setUpModal: (state, action) => {
            state.activeModal = action.payload;
        }
    },

})
const {actions, reducer} = modalSlice;

export const {
    setUpModal,
} = actions;

export {reducer as modalReducer};