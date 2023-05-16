import PropTypes from 'prop-types'

import {
    Text
} from '@vkontakte/vkui'
import { Icon28CancelCircleFillRed } from '@vkontakte/icons';

import styles from './ApiErrorBlock.module.css'

function ApiErrorBlock({error}) {
    const message = (
        <Text className={styles.errorMsg}>
            {error.error_data.error_msg}
        </Text>
    )

    const title = (
        <Text className={styles.errorTitle}>
            {error.error_data.error_code}: {error.error_type}
        </Text>
    )

    return (
        <div className={styles.error}>
            <div className={styles.errorTitle}>
                {title}
            </div>
            <div className={styles.errorDesc}>
                {message}
            </div>
        </div>
    )
}

ApiErrorBlock.propTypes = {
    error: PropTypes.shape({
        error_type: PropTypes.string,
        error_data: PropTypes.shape({
            error_code: PropTypes.number,
            error_msg: PropTypes.string
        })
    }).isRequired
}

export {ApiErrorBlock}