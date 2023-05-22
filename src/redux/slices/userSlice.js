import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import bridge from "@vkontakte/vk-bridge";

import {APP_ID} from '../../utils/constants'

import {ApiError} from '../../utils/errors/ApiError'

const fetchUserToken = createAsyncThunk(
    'user/getAccessToken',
    async ({scope}) => {
        try {
            return await bridge.send('VKWebAppGetAuthToken', {
                app_id: APP_ID,
                scope: scope,
            });
        } catch (err) {
            throw new ApiError(err);
        }

    }
)

const launch_params = Object.fromEntries(
    new URLSearchParams(window.location.search)
);

let initialState = {
    accessToken: {
        value: null,
        scope: launch_params.vk_access_token_settings,
        expires: null,

        fetchStatus: {
            loadingStatus: 'idle',
            error: null,
        }
    },
    userId: launch_params.vk_user_id,
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchUserToken.pending, (state) => {
                state.accessToken.value = null;

                state.accessToken.fetchStatus.error = null;
                state.accessToken.fetchStatus.loadingStatus = 'loading';
            })
            .addCase(fetchUserToken.fulfilled, (state, action) => {
                const {access_token, scope, expires} = action.payload;
                state.accessToken.value = access_token;
                state.accessToken.scope = scope;
                state.accessToken.expires = expires;

                state.accessToken.fetchStatus.error = null;
                state.accessToken.fetchStatus.loadingStatus = 'success';
            })
            .addCase(fetchUserToken.rejected, (state, action) => {
                console.log(action.error);
                state.accessToken.value = null;
                state.accessToken.fetchStatus.error = action.error;
                state.accessToken.fetchStatus.loadingStatus = 'failed';
            })
    }

})
const {actions, reducer} = userSlice;

export const {} = actions;

export {reducer as userReducer};
export {fetchUserToken};