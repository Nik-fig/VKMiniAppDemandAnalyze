import PropTypes from 'prop-types';
import {
    Tappable,
    Placeholder
} from "@vkontakte/vkui";
import {Icon56MarketOutline} from "@vkontakte/icons";

import styles from "./ProductSimpleCell.module.css";

import {ProductFetchContainer} from '../../containers/ProductFetchContainer'

function ProductSimpleCellTemplate({onClick, product}) {

    const {
        title,
        thumb_photo: photo,
        sku,
        availability,
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
            <div className={styles.productSku}>
                {sku}
            </div>
        </div>
    )
}

const ProductSimpleCell = ProductFetchContainer({
    RenderElement: ProductSimpleCellTemplate,
});

ProductSimpleCell.propTypes = {
    id: PropTypes.number.isRequired,
    onClick: PropTypes.func,
};


export {ProductSimpleCell}