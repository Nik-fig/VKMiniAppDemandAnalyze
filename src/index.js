import React from "react";
import ReactDOM from "react-dom";

import {Provider} from 'react-redux'
import bridge from "@vkontakte/vk-bridge";
import {
    AdaptivityProvider,
    ConfigProvider,
    AppRoot,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import {App} from "./App";
import {store} from './redux/store';

bridge.send('VKWebAppInit')
    .then(data => {
        if (data.result) {
            //
        } else {
            //
        }
    })
    .catch((error) => {
        console.log(error);
    });

const root = document.getElementById("root")

const react_init = (
    <Provider store={store}>
        <ConfigProvider webviewType='internal'>
            <AdaptivityProvider>
                <AppRoot>
                    <App/>
                </AppRoot>
            </AdaptivityProvider>
        </ConfigProvider>
    </Provider>
)

ReactDOM.render(
    react_init
    , root
);

if (process.env.NODE_ENV === "development") {
    import("./eruda")
        .then(
            ({default: eruda}) => {
            }
        ); //runtime download
}
