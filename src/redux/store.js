import {configureStore} from '@reduxjs/toolkit'

import {userReducer} from './slices/userSlice';
import {viewReducer} from './slices/viewSlice';
import {panelReducer} from './slices/panelSlice';
import {demandQueryReducer} from './slices/demandQuerySlice';
import {modalReducer} from "./slices/modalSlice";
import {communityReducer} from './slices/communitySlice';
export const store = configureStore({
    reducer: {
        user: userReducer,
        view: viewReducer,
        panel: panelReducer,
        demandQuery: demandQueryReducer,
        modal: modalReducer,
        community: communityReducer,
    }
})