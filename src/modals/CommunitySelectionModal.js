import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {
    Group,
    ModalPage,
    ModalPageHeader,
    PanelSpinner,
} from "@vkontakte/vkui";

import bridge from "@vkontakte/vk-bridge";

import {CommunitySimpleCell} from '../components/CommunitySimpleCell';

import {setUpCommunity} from '../redux/slices/demandQuerySlice';
import {setUpModal} from '../redux/slices/modalSlice'

export const COMMUNITY_SELECTION_MODAL_ID = 'CommunitySelectionModal'

export function CommunitySelectionModal() {
    const dispatch = useDispatch();

    const [communitiesFetch, setCommunitiesFetch] = useState({
        items: null,
        loadingStatus: 'idle',
        error: null,
    });

    const {
        items: communities,
        loadingStatus,
        error,
    } = communitiesFetch;

    const {
        accessToken: {
            value: accessToken
        },
        userId,
    } = useSelector(state => state.user);

    useEffect(() => {
        setCommunitiesFetch({
            ...communitiesFetch,
            loadingStatus: 'loading',
        });
        bridge.send('VKWebAppCallAPIMethod', {
            method: 'groups.get', params: {
                access_token: accessToken,
                user_ids: userId,
                v: '5.131',
                filter: 'admin',
                extended: '1',
                fields: ['id', 'name', 'photo_50',].join(',')
            }
        })
            .then(data => {
                    setCommunitiesFetch({
                        ...communitiesFetch,
                        items: data.response.items,
                        loadingStatus: 'success',
                    })
                },
                error => {
                    console.error(error);
                    setCommunitiesFetch({
                        ...communitiesFetch,
                        loadingStatus: 'failed',
                        error: error
                    })
                }
            )
    }, [])

    let template;
    let header;

    switch (loadingStatus) {
        case 'success':
            header = 'Ваши администрируемые сообщества';
            template = communities.map((value, index) => {
                return (<CommunitySimpleCell
                    key={index}

                    id={value.id}
                    photo={value.photo_50}
                    name={value.name}

                    onClick={() => {
                        dispatch(setUpCommunity({
                            id: value.id, photo: value.photo_50, name: value.name,
                        }));
                        dispatch(setUpModal(null));
                    }}
                />)
            })
            break;

        case 'loading':
            header = 'Получаю ваши сообщества';
            template = (<PanelSpinner size='large'/>);
            break;

        case 'failed':
            header = 'Ошибка';
            template = error;
            break;
        default:
            template = ('У вас нет администрируемых сообществ');
            break;
    }


    return (<ModalPage
        id={COMMUNITY_SELECTION_MODAL_ID}
    >
        <ModalPageHeader>{header}</ModalPageHeader>
        <Group>
            {template}
        </Group>
    </ModalPage>)
}
