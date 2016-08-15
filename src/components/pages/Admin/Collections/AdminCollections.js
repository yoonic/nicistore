/**
 * Imports
 */
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import {FormattedMessage} from 'react-intl';
import {Link} from 'react-router';

// Flux
import CollectionsAddStore from '../../../../stores/Collections/CollectionsAddStore';
import CollectionsListStore from '../../../../stores/Collections/CollectionsListStore';
import CollectionsStore from '../../../../stores/Collections/CollectionsStore';
import IntlStore from '../../../../stores/Application/IntlStore';

import addCollection from '../../../../actions/Admin/addCollection';
import fetchCollections from '../../../../actions/Collections/fetchCollections';

// Required components
import Button from '../../../common/buttons/Button';
import Heading from '../../../common/typography/Heading';
import Label from '../../../common/indicators/Label';
import Modal from '../../../common/modals/Modal';
import StatusIndicator from '../../../common/indicators/StatusIndicator';
import Table from '../../../common/tables/Table';
import Text from '../../../common/typography/Text';

import AdminCollectionsAddForm from './AdminCollectionsAddForm';

// Translation data for this component
import intlData from './AdminCollections.intl';

/**
 * Component
 */
class AdminCollections extends React.Component {

    static contextTypes = {
        executeAction: React.PropTypes.func.isRequired,
        getStore: React.PropTypes.func.isRequired,
        router: React.PropTypes.func.isRequired
    };

    //*** Required Data ***//

    static fetchData = function (context, params, query, done) {
        context.executeAction(fetchCollections, {}, done);
    };

    //*** Initial State ***//

    state = {
        addCollection: this.context.getStore(CollectionsAddStore).getState(),
        collections: this.context.getStore(CollectionsListStore).getCollections(),
        showNewCollectionModal: false
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./AdminCollections.scss');
    }

    componentWillReceiveProps(nextProps) {

        // If new collection was being added and was successful, redirect to
        // collection edit page
        if (this.state.addCollection.loading === true
            && nextProps._addCollection.loading === false && !nextProps._addCollection.error) {
            let params = {
                locale: this.context.getStore(IntlStore).getCurrentLocale(),
                collectionId: nextProps._addCollection.collection.id
            };
            this.context.router.transitionTo('adm-collection-edit', params);
        }

        // Update state
        this.setState({
            addCollection: nextProps._addCollection,
            collections: nextProps._collections
        });
    }

    //*** View Controllers ***//

    handleNewCollectionClick = () => {
        this.setState({showNewCollectionModal: true});
    };

    handleNewCollectionCloseClick = () => {
        this.setState({showNewCollectionModal: false});
    };

    handleNewCollectionSubmitClick = (data) => {
        this.context.executeAction(addCollection, data);
    };

    //*** Template ***//

    render() {

        //
        // Helper methods & variables
        //

        let intlStore = this.context.getStore(IntlStore);
        let routeParams = {locale: this.context.getStore(IntlStore).getCurrentLocale()}; // Base route params

        let headings = [
            <FormattedMessage
                message={intlStore.getMessage(intlData, 'nameHeading')}
                locales={intlStore.getCurrentLocale()} />,
            <FormattedMessage
                message={intlStore.getMessage(intlData, 'parentHeading')}
                locales={intlStore.getCurrentLocale()} />,
            <FormattedMessage
                message={intlStore.getMessage(intlData, 'tagsHeading')}
                locales={intlStore.getCurrentLocale()} />,
            <FormattedMessage
                message={intlStore.getMessage(intlData, 'enabledHeading')}
                locales={intlStore.getCurrentLocale()} />
        ];

        let rows = this.state.collections.map((collection) => {
            return {
                data: [
                    <span className="admin-collections__link">
                        <Link to="adm-collection-edit" params={Object.assign({collectionId: collection.id}, routeParams)}>
                            <FormattedMessage
                                message={intlStore.getMessage(collection.name)}
                                locales={intlStore.getCurrentLocale()} />
                        </Link>
                    </span>,
                    <Text size="medium">
                        {collection.parentId ?
                            <span>
                                {intlStore.getMessage(this.context.getStore(CollectionsStore).getCollection(collection.parentId).name)}
                            </span>
                            :
                            <span>-</span>
                        }
                    </Text>,
                    <Text size="medium">
                        <div className="admin-collections__labels">
                            {collection.tags.map(function (section, idx) {
                                return (
                                    <div key={idx} className="admin-collections__label">
                                        <Label>
                                            <FormattedMessage
                                                message={intlStore.getMessage(intlData, section)}
                                                locales={intlStore.getCurrentLocale()} />
                                        </Label>
                                    </div>
                                );
                            })}
                        </div>
                    </Text>,
                    <StatusIndicator status={(collection.enabled === true) ? 'success' : 'default'} />
                ]
            };
        });

        let newCollectionModal = () => {
            if (this.state.showNewCollectionModal) {
                return (
                    <Modal title={intlStore.getMessage(intlData, 'newModalTitle')}
                           onCloseClick={this.handleNewCollectionCloseClick}>
                        <AdminCollectionsAddForm
                            loading={this.state.addCollection.loading}
                            onCancelClick={this.handleNewCollectionCloseClick}
                            onSubmitClick={this.handleNewCollectionSubmitClick} />
                    </Modal>
                );
            }
        };

        //
        // Return
        //
        return (
            <div className="admin-collections">
                {newCollectionModal()}

                <div className="admin-collections__header">
                    <div className="admin-collections__title">
                        <Heading size="medium">
                            <FormattedMessage
                                message={intlStore.getMessage(intlData, 'title')}
                                locales={intlStore.getCurrentLocale()} />
                        </Heading>
                    </div>
                    <div className="admin-collections__toolbar">
                        <div className="admin-collections__add-button">
                            <Button type="primary" onClick={this.handleNewCollectionClick}>
                                <FormattedMessage
                                    message={intlStore.getMessage(intlData, 'new')}
                                    locales={intlStore.getCurrentLocale()} />
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="admin-collections__list">
                    <Table headings={headings} rows={rows} />
                </div>
            </div>
        );
    }
}

/**
 * Flux
 */
AdminCollections = connectToStores(AdminCollections, [CollectionsAddStore, CollectionsListStore], (context) => {
    return {
        _addCollection: context.getStore(CollectionsAddStore).getState(),
        _collections: context.getStore(CollectionsListStore).getCollections()
    };
});

/**
 * Exports
 */
export default AdminCollections;
