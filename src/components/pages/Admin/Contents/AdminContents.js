/**
 * Imports
 */
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import {FormattedMessage} from 'react-intl';
import {Link} from 'react-router';

// Flux
import ContentsAddStore from '../../../../stores/Contents/ContentsAddStore';
import ContentsListStore from '../../../../stores/Contents/ContentsListStore';
import IntlStore from '../../../../stores/Application/IntlStore';

import addContent from '../../../../actions/Admin/addContent';
import fetchContents from '../../../../actions/Contents/fetchContents';

// Required components
import Button from '../../../common/buttons/Button';
import Heading from '../../../common/typography/Heading';
import Label from '../../../common/indicators/Label';
import Modal from '../../../common/modals/Modal';
import Spinner from '../../../common/indicators/Spinner';
import StatusIndicator from '../../../common/indicators/StatusIndicator';
import Table from '../../../common/tables/Table';
import Text from '../../../common/typography/Text';

import AdminContentsAddForm from './AdminContentsAddForm';

// Translation data for this component
import intlData from './AdminContents.intl';

/**
 * Component
 */
class AdminContents extends React.Component {

    static contextTypes = {
        executeAction: React.PropTypes.func.isRequired,
        getStore: React.PropTypes.func.isRequired,
        router: React.PropTypes.func.isRequired
    };

    //*** Initial State ***//

    state = {
        addContent: this.context.getStore(ContentsAddStore).getState(),
        contents: this.context.getStore(ContentsListStore).getContents(),
        loading: this.context.getStore(ContentsListStore).isLoading(),
        showNewContentModal: false
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./AdminContents.scss');

        // Request required data
        this.context.executeAction(fetchContents, {});
    }

    componentWillReceiveProps(nextProps) {

        // If new content was being added and was successful, redirect to
        // content edit page
        if (this.state.addContent.loading === true
            && nextProps._addContent.loading === false && !nextProps._addContent.error) {
            let params = {
                locale: this.context.getStore(IntlStore).getCurrentLocale(),
                contentId: nextProps._addContent.content.id
            };
            this.context.router.transitionTo('adm-content-edit', params);
        }

        // Update state
        this.setState({
            addContent: nextProps._addContent,
            contents: nextProps._contents,
            loading: nextProps._loading
        });
    }

    //*** View Controllers ***//

    handleNewContentClick = () => {
        this.setState({showNewContentModal: true});
    };

    handleNewContentCloseClick = () => {
        this.setState({showNewContentModal: false});
    };

    handleNewContentSubmitClick = (data) => {
        this.context.executeAction(addContent, data);
    };

    //*** Template ***//

    render() {

        //
        // Helper methods & variables
        //
        let intlStore = this.context.getStore(IntlStore);
        let routeParams = {locale: this.context.getStore(IntlStore).getCurrentLocale()}; // Base route params

        let newContentModal = () => {
            if (this.state.showNewContentModal) {
                return (
                    <Modal title={intlStore.getMessage(intlData, 'newModalTitle')}
                           onCloseClick={this.handleNewContentCloseClick}>
                        <AdminContentsAddForm
                            loading={this.state.addContent.loading}
                            onCancelClick={this.handleNewContentCloseClick}
                            onSubmitClick={this.handleNewContentSubmitClick} />
                    </Modal>
                );
            }
        };

        let headings = [
            <FormattedMessage message={intlStore.getMessage(intlData, 'typeHeading')}
                              locales={intlStore.getCurrentLocale()} />,
            <FormattedMessage message={intlStore.getMessage(intlData, 'nameHeading')}
                              locales={intlStore.getCurrentLocale()} />,
            <FormattedMessage message={intlStore.getMessage(intlData, 'tagsHeading')}
                              locales={intlStore.getCurrentLocale()} />,
            <FormattedMessage message={intlStore.getMessage(intlData, 'enabledHeading')}
                              locales={intlStore.getCurrentLocale()} />
        ];

        let rows = this.state.contents.map(function (content) {
            return {
                data: [
                    <Text size="medium">
                        {content.type ?
                            <Label>
                                <FormattedMessage message={intlStore.getMessage(intlData, content.type)}
                                                  locales={intlStore.getCurrentLocale()} />
                            </Label>
                            :
                            <Label type="error">
                                <FormattedMessage message={intlStore.getMessage(intlData, 'noType')}
                                                  locales={intlStore.getCurrentLocale()} />
                            </Label>
                        }
                    </Text>,
                    <span className="admin-contents__link">
                        <Link to="adm-content-edit" params={Object.assign({contentId: content.id}, routeParams)}>
                            <FormattedMessage message={intlStore.getMessage(content.name)}
                                              locales={intlStore.getCurrentLocale()} />
                        </Link>
                    </span>,
                    <div className="admin-contents__labels">
                        {content.tags.map(function (tag, idx) {
                            return (
                                <div key={idx} className="admin-contents__tag">
                                    <Label>
                                        <FormattedMessage message={intlStore.getMessage(intlData, tag)}
                                                          locales={intlStore.getCurrentLocale()} />
                                    </Label>
                                </div>
                            );
                        })}
                    </div>,
                    <StatusIndicator status={(content.enabled === true) ? 'success' : 'default'} />
                ]
            };
        });

        //
        // Return
        //
        return (
            <div className="admin-contents">
                {newContentModal()}

                <div className="admin-contents__header">
                    <div className="admin-contents__title">
                        <Heading size="medium">
                            <FormattedMessage
                                message={intlStore.getMessage(intlData, 'title')}
                                locales={intlStore.getCurrentLocale()} />
                        </Heading>
                    </div>
                    <div className="admin-contents__toolbar">
                        <div className="admin-contents__add-button">
                            <Button type="primary" onClick={this.handleNewContentClick}>
                                <FormattedMessage
                                    message={intlStore.getMessage(intlData, 'new')}
                                    locales={intlStore.getCurrentLocale()} />
                            </Button>
                        </div>
                    </div>
                </div>

                {this.state.loading ?
                    <div className="admin-contents__spinner">
                        <Spinner />
                    </div>
                    :
                    <div className="admin-contents__list">
                        <Table headings={headings} rows={rows} />
                    </div>
                }
            </div>
        );
    }
}

/**
 * Flux
 */
AdminContents = connectToStores(AdminContents, [ContentsAddStore, ContentsListStore], (context) => {
    return {
        _addContent: context.getStore(ContentsAddStore).getState(),
        _contents: context.getStore(ContentsListStore).getContents(),
        _loading: context.getStore(ContentsListStore).isLoading()
    };
});

/**
 * Exports
 */
export default AdminContents;
