import {createSlice} from '@reduxjs/toolkit';

let initialState = {
    selectedCommunity: {
        id: null,
        photo: null,
        name: 'Выберите сообщество'
    },
};


const demandQuerySlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUpCommunity: (state, action) => {
            state.selectedCommunity = action.payload;
        }
    },

})
const {actions, reducer} = demandQuerySlice;

export const {
    setUpCommunity
} = actions;

export {reducer as demandQueryReducer};