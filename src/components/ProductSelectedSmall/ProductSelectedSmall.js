import PropTypes from 'prop-types'

import {
    Placeholder,
} from '@vkontakte/vkui';
import {Icon56MarketOutline} from '@vkontakte/icons';

import styles from './ProductSelectedSmall.module.css'

import {ProductFetchContainer} from '../../containers/ProductFetchContainer';

function ProductSelectedSmallTemplate({onClick, product}) {
    const {
        thumb_photo: photo,
        title,
    } = product;

    const template = (
        photo
            ? <img
                src={photo}
                alt={title}
            />
            : <Placeholder
                icon={<Icon56MarketOutline/>}
            />

    );
    return (
            <div
                className={styles.product}
                onClick={onClick}
            >
                <div className={styles.productImage}>
                    {template}
                </div>
                <div className={styles.productTitle}>
                    {title}
                </div>
            </div>
    )
}

const ProductSelectedSmall = ProductFetchContainer({
    RenderElement: ProductSelectedSmallTemplate,
})

ProductSelectedSmall.propTypes = {
    id: PropTypes.number.isRequired,
    onClick: PropTypes.func
}

export {ProductSelectedSmall}