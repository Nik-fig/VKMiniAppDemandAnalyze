import React from "react";
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {PanelSpinner,} from "@vkontakte/vkui";

import {communityObject, getCommunityById} from '../utils/api/vk/services/community'

import {ApiErrorBlock} from '../components/ApiErrorBlock/ApiErrorBlock'

function CommunityFetchContainer({RenderElement}) {
    const NewElement = class extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                community: communityObject,
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

            this.setState({
                community: null,
                loadingStatus: 'loading',
                error: null,
            })

            getCommunityById({
                    id: this.props.id,
                    fields: ['activity', 'members_count'],
                    accessToken: accessToken
                }
            )
                .then(data => {
                    const item = data.response[0];
                    this.setState({
                        community: item,
                        loadingStatus: 'success',
                        error: null,
                    })
                }, error => {
                    console.error(error);
                    this.setState({
                        community: null,
                        loadingStatus: 'failed',
                        error: error
                    })
                })
        }

        render() {

            const {
                loadingStatus,
                error,
                community,
            } = this.state;

            let template = <></>;

            switch (loadingStatus) {
                case 'loading':
                    template = (<PanelSpinner size='large'/>)
                    break;
                case 'success':
                    template = (
                        <RenderElement
                            community={community}
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
            user: state.user
        }
    }


    return connect(
        mapStateToProps
    )(NewElement);
}

CommunityFetchContainer.propTypes = {
    RenderElement: PropTypes.elementType.isRequired
}
export {CommunityFetchContainer}
