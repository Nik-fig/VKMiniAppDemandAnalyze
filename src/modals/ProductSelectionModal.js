import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {
    PanelSpinner,
    ModalPage,
    ModalPageHeader,
    Text,
    IconButton, Tappable,
} from "@vkontakte/vkui";
import {Icon28SwitchOutline} from '@vkontakte/icons';

import {useConstructor} from "../utils/hooks/useConstructor";

import {getProductsByCommunityId} from "../utils/api/vk/services/product";

import {ProductSimpleCell} from '../components/ProductSimpleCell/ProductSimpleCell'

import {setUpProduct} from '../redux/slices/demandQuerySlice'
import {setUpModal} from '../redux/slices/modalSlice';

import {fetchUserToken} from '../redux/slices/userSlice'

export const PRODUCT_SELECTION_MODAL_ID = 'ProductSelectionModal';

export function ProductSelectionModal() {
    const dispatch = useDispatch();

    const {
        accessToken: {
            value: accessToken,
            scope: accessTokenScope,
            fetchStatus: {
                loadingStatus: accessTokenLoadingStatus,
                error: accessTokenError,
            }
        },
    } = useSelector(state => state.user);

    const {
        selectedCommunityId
    } = useSelector(state => state.demandQuery);

    const [productsFetch, setProductsFetch] = useState({
        items: null,
        loadingStatus: 'idle',
        error: null,
    });

    const {
        items: products,
        loadingStatus: productsLoadingStatus,
        error: productsError,
    } = productsFetch;


    useConstructor(() => {
        if (accessToken && accessTokenScope.includes('market'))
            return;

        dispatch(fetchUserToken({scope: 'market'}));
    })

    function getProductsFetch() {
        getProductsByCommunityId({
            accessToken: accessToken,
            communityId: selectedCommunityId
        })
            .then(data => {
                let items;

                if (data.response.items.length)
                    items = data.response.items.map((value) => {
                        return value.id
                    })
                else
                    items = data.response.items;
                setProductsFetch({
                    items: items,
                    loadingStatus: 'success',
                    error: null,
                })
            }, error => {
                console.error(error);
                setProductsFetch({
                    items: null,
                    loadingStatus: 'failed',
                    error: error
                })
            })
    }

    useEffect(() => {
        if (!accessToken || !accessTokenScope.includes('market'))
            return;

        setProductsFetch({
            items: null,
            loadingStatus: 'loading',
            error: null,
        });

        getProductsFetch();

    }, [accessToken])


    let header;
    let template;
    let modalHeaderAfter;

    switch (accessTokenLoadingStatus) {
        case 'loading':
            header = 'Получаю токе доступа к товарам'
            template = (<PanelSpinner size='large'/>);
            break;
        case 'success':
            header = 'Успех'
            template = 'Токен доступа к товарам получен';
            break;
        case 'failed':
            header = <Text>{accessTokenError.error_data.error_code}: {accessTokenError.error_type}</Text>
            template = <Text>{accessTokenError.error_data.error_msg}</Text>
            modalHeaderAfter = (
                <IconButton
                    onClick={() => {
                        dispatch(fetchUserToken({scope: 'market'}))
                    }}
                >
                    <Icon28SwitchOutline/>
                </IconButton>
            )
            break;
    }

    switch (productsLoadingStatus) {
        case 'loading':
            header = 'Получаю товары'
            template = (<PanelSpinner size='large'/>);
            break;
        case 'success':
            header = 'Товары в сообществе'
            if (!products.length) {
                template = 'У вас нет товаров';
                break;
            }
            const productsBlocks = products.map((value) => {
                return (
                    <Tappable
                        key={value}
                    >
                        <ProductSimpleCell

                            id={value}
                            onClick={() => {
                                dispatch(setUpModal(null));
                                dispatch(setUpProduct(value));
                            }}
                        />
                    </Tappable>
                )
            })

            template = (
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, auto)',
                        gridGap: '15px',
                        margin: '10px',
                    }}
                >
                    {productsBlocks}
                </div>
            )

            break;
        case  'failed':
            header = <Text>{productsError.error_data.error_code}: {productsError.error_type}</Text>
            template = <Text>{productsError.error_data.error_msg}</Text>
            modalHeaderAfter = (
                <IconButton
                    onClick={() => {
                        getProductsFetch()
                    }}
                >
                    <Icon28SwitchOutline/>
                </IconButton>
            )
            break;
    }

    return (
        <ModalPage
            id={PRODUCT_SELECTION_MODAL_ID}
            dynamicContentHeight={true}
            size={'l'}
        >
            <ModalPageHeader
                after={modalHeaderAfter}
            >
                {header}
            </ModalPageHeader>
            {template}
        </ModalPage>
    )
}