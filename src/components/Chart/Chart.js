import {useEffect, useState} from 'react';

import {useSelector} from 'react-redux'

import {
    Text,
    PanelSpinner
} from '@vkontakte/vkui'
import {useAppearance} from '@vkontakte/vkui'

import 'zingchart/es6';
import ZingChart from 'zingchart-react';

import {config as initialConfig} from './config';

import {getProductMentionsChats} from '../../utils/getProductMentionsChats'

const emptySeries = [{
    values: []
}]
export function Chart() {
    const [config, setConfig] = useState(initialConfig);

    const [dataStatus, setDataStatus] = useState({
        value: emptySeries,
        loadingStatus: 'idle',
        error: null,
    });

    const {
        value: series,
        loadingStatus: dataLoadingStatus,
        error: dataError,
    } = dataStatus;

    const {
        selectedProductId,
        selectedCommunityId,
    } = useSelector(state => state.demandQuery)

    const {
        accessToken: {
            value: communityAccessToken,
        }
    } = useSelector(state => state.community)

    const appearance = useAppearance();

    useEffect(() => {
        setConfig({
            ...config,
            theme: appearance,
        })

        setDataStatus({
            value: null,
            loadingStatus: 'loading',
            error: null,
        })

        getProductMentionsChats({
            communityAccessToken: communityAccessToken,
            communityId: selectedCommunityId,
            product_id: selectedProductId,
        })
            .then(results => {
                let transformedData = {};

                if (!results.length) {
                    setDataStatus({
                        value: emptySeries,
                        loadingStatus: 'success',
                        error: null,
                    })
                    return;
                }

                for (const result of results) {
                    const date = new Date(result.date);
                    date.setHours(0, 0, 0, 0);
                    const dateTimestamp = date.getTime();

                    if (transformedData.hasOwnProperty(dateTimestamp))
                        transformedData[dateTimestamp]++
                    else
                        transformedData[dateTimestamp] = 1;
                }

                setConfig({
                    ...config,
                    "plotarea": {
                        'adjust-layout': true
                    },
                    "scale-x": {
                        "label": {
                            "text": "Даты",
                        },
                        "labels": Object.keys(transformedData)
                            .reverse()
                            .map(item => new Date(+item).toLocaleDateString())
                    },
                    'scale-y': {
                        "step": 1,
                    }
                })

                setDataStatus({
                    value: [{
                        values: Object.entries(transformedData).reverse(),
                    }],
                    loadingStatus: 'success',
                    error: null,
                })
            })
            .catch(error => {
                console.error(error);
                setDataStatus({
                    value: null,
                    loadingStatus: 'failed',
                    error: error,
                })
            })

    }, [])

    let template;

    switch (dataLoadingStatus) {
        case 'success':
            template = (
                <ZingChart
                    data={config}
                    series={series}
                />
            )
            break;
        case 'loading':
            template = (
                <>
                    <Text>Получаю данные</Text>
                    <PanelSpinner size='large'/>
                </>
            )
            break;
        case 'failed':
            console.error(dataError);
            break;
    }

    return (
        <>
            {template}
        </>
    );
}

