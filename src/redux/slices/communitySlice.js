import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import bridge from "@vkontakte/vk-bridge";

import {APP_ID} from '../../utils/constants';

const fetchCommunityToken = createAsyncThunk(
    'community/getCommunityToken',
    async ({scope, groupId}) => {

        try {
            return await bridge.send('VKWebAppGetCommunityToken', {
                app_id: APP_ID,
                group_id: groupId,
                scope: scope,
            });
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
)


let initialState = {
    accessToken: {
        value: null,

        fetchStatus: {
            loadingStatus: 'idle',
            error: null,
        }
    }
};

const communitySlice = createSlice({
    name: 'community',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchCommunityToken.pending, (state) => {
                state.accessToken.fetchStatus.error = null;
                state.accessToken.fetchStatus.loadingStatus = 'loading';
            })
            .addCase(fetchCommunityToken.fulfilled, (state, action) => {
                const {access_token} = action.payload;
                state.accessToken.value = access_token;

                state.accessToken.fetchStatus.error = null;
                state.accessToken.fetchStatus.loadingStatus = 'success';
            })
            .addCase(fetchCommunityToken.rejected, (state, action) => {

                console.error(action.error);
                state.accessToken.fetchStatus.error = action.error;
                state.accessToken.fetchStatus.loadingStatus = 'failed';
            })

    }

})
const {actions, reducer} = communitySlice;

export const {} = actions;

export {reducer as communityReducer};
export {fetchCommunityToken};