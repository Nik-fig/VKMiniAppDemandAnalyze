import PropTypes from 'prop-types'

import {
    Placeholder,
} from '@vkontakte/vkui';
import {Icon56MarketOutline} from '@vkontakte/icons';

import styles from './ProductSelected.module.css';

import {ProductFetchContainer} from '../../containers/ProductFetchContainer';

function ProductSelectedTemplate({onClick, product}) {
    const {
        thumb_photo: photo, title, description, price, sku,
    } = product;

    const template = (photo ? <img
            src={photo}
            alt={title}
        /> : <Placeholder
            icon={<Icon56MarketOutline/>}
        />

    );
    return (
        <div
            style={{
                display: 'inline-block',
            }}
            onClick={onClick}
        >
            <div className={styles.product}>
                <div className={styles.productImage}>
                    {template}
                </div>
                <div className={styles.productTitle}>
                    {title}
                </div>
                <div className={styles.productDesc}>
                    {description}
                </div>
                <div className={styles.productCost}>
                    {price.text}
                </div>
                <div className={styles.productSku}>
                    {sku}
                </div>
            </div>
        </div>
    )
}

const ProductSelected = ProductFetchContainer({
    RenderElement: ProductSelectedTemplate,
})

ProductSelected.propTypes = {
    id: PropTypes.number.isRequired, onClick: PropTypes.func
}

export {ProductSelected}