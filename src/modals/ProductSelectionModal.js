import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {
    PanelSpinner,
    SplitLayout,
    SplitCol,
    ModalPage,
    ModalPageHeader, Text,
} from "@vkontakte/vkui";

import {useConstructor} from "../utils/hooks/useConstructor";

import {getProducts} from "../utils/api/vk/services/product";

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
        if (accessTokenScope.indexOf('market') !== -1)
            return;
        dispatch(fetchUserToken({scope: 'market'}));
    })

    let header;
    let template;

    switch (accessTokenLoadingStatus) {
        case 'loading':
            header = 'Получаю доступ к товарам'
            template = (<PanelSpinner size='large'/>);
            break;
        case 'success':
            header = 'Успех'
            template = 'Доступ к товарам получен';
            break;
        case 'failed':
            header = <Text>{accessTokenError.error_data.error_code}: {accessTokenError.error_type}</Text>
            template = <Text>{accessTokenError.error_data.error_msg}</Text>
            break;
    }

    useEffect(() => {
        if (!accessToken)
            return;

        setProductsFetch({
            items: null,
            loadingStatus: 'loading',
            error: null,
        });

        getProducts({
            accessToken: accessToken,
            selectedCommunityId: selectedCommunityId
        })
            .then(data => {
                let items;

                if (data.response.items.length)
                    items = data.response.items.map((value, index) => {
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

    }, [accessToken])

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
            template = products.map((value, index) => {
                return (
                    <ProductSimpleCell
                        key={value}
                        id={value}
                        onClick={() => {
                            dispatch(setUpModal(null));
                            dispatch(setUpProduct(value));
                        }}
                    />
                )
            })
            break;
        case  'failed':
            header = <Text>{productsError.error_data.error_code}: {productsError.error_type}</Text>
            template = <Text>{productsError.error_data.error_msg}</Text>
            break;

    }

    return (
        <ModalPage
            id={PRODUCT_SELECTION_MODAL_ID}
            dynamicContentHeight={true}
            size={'l'}
        >
            <ModalPageHeader>{header}</ModalPageHeader>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, auto)',
                    gridGap: '15px',
                    margin: '10px',
                }}
            >
                {template}
            </div>
        </ModalPage>
    )
}