import React from "react";
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {
    PanelSpinner,
} from "@vkontakte/vkui";

import {productObject, getProductsById} from '../utils/api/vk/services/product'

import {ApiErrorBlock} from '../components/ApiErrorBlock/ApiErrorBlock'

function ProductFetchContainer({RenderElement}) {
    const NewElement = class extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                product: productObject,
                loadingStatus: 'idle',
                error: null,
            }

        }

        componentDidMount() {

            const {
                accessToken: {
                    value: accessToken,
                }
            } = this.props.user;

            const {
                selectedCommunityId
            } = this.props.demandQuery;

            this.setState({
                product: null,
                loadingStatus: 'loading',
                error: null,
            })

            getProductsById({
                    id: this.props.id,
                    accessToken: accessToken,
                    selectedCommunityId: selectedCommunityId,
                }
            )
                .then(data => {
                    const item = data.response.items[0];
                    this.setState({
                        product: item,
                        loadingStatus: 'success',
                        error: null,
                    })
                }, error => {
                    console.error(error);
                    this.setState({
                        product: null,
                        loadingStatus: 'failed',
                        error: error
                    })
                })
        }

        render() {

            const {
                loadingStatus,
                error,
                product,
            } = this.state;

            let template = <></>;

            switch (loadingStatus) {
                case 'loading':
                    template = (<PanelSpinner size='large'/>)
                    break;
                case 'success':
                    template = (
                        <RenderElement
                            product={product}
                            {...this.props}
                        />
                    )
                    break;
                case 'failed':
                    template = (
                        <ApiErrorBlock error={error}/>
                    )
                    break;
            }
            return template;
        }
    }

    const mapStateToProps = state => {
        return {
            user: state.user,
            demandQuery: state.demandQuery,
        }
    }


    return connect(
        mapStateToProps
    )(NewElement);
}

ProductFetchContainer.propTypes = {
    RenderElement: PropTypes.elementType.isRequired
}

export {ProductFetchContainer}
