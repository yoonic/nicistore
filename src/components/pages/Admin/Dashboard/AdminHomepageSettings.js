/**
 * Imports
 */
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import {FormattedMessage} from 'react-intl';

import {move as arrayMove} from '../../../../utils/arrays';

// Flux
import ContentsListStore from '../../../../stores/Contents/ContentsListStore';
import CollectionsStore from '../../../../stores/Collections/CollectionsStore';
import CollectionsFeaturedHomepage from '../../../../stores/Collections/CollectionsFeaturedHomepage';
import IntlStore from '../../../../stores/Application/IntlStore';

import bulkBannersUpdate from '../../../../actions/Admin/bulkBannersUpdate';
import updateHomepageFeaturedCollections from '../../../../actions/Admin/updateHomepageFeaturedCollections';

// Required Components
import Button from '../../../common/buttons/Button';
import DirectionButton from '../../../common/buttons/DirectionButton';
import FormLabel from '../../../common/forms/FormLabel';
import InlineItems from '../../../common/forms/InlineItems';
import Select from '../../../common/forms/Select';

// Translation data for this component
import intlData from './AdminHomepageSettings.intl';

/**
 * Component
 */
class AdminHomepageSettings extends React.Component {

    static contextTypes = {
        executeAction: React.PropTypes.func.isRequired,
        getStore: React.PropTypes.func.isRequired
    };

    //*** Initial State ***//

    state = {
        banners: this.context.getStore(ContentsListStore).getOrderedContentsOfType('banner', ['homepage'], true),
        collections: this.context.getStore(CollectionsStore).getCollections([], true),
        featuredCollections: this.context.getStore(CollectionsStore).getOrderedCollections(['homepageFeatured'], true, 'homepageFeaturedOrder'),
        featuredUpdate: this.context.getStore(CollectionsFeaturedHomepage).getState()
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./AdminHomepageSettings.scss');
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            banners: nextProps._banners,
            collections: nextProps._collections,
            featuredCollections: nextProps._featuredCollections,
            featuredUpdate: nextProps._featuredUpdate
        });
    }

    //*** Helper Methods ***//

    updateBannersOrder = (fromIdx, toIdx) => {
        let banners = this.state.banners;
        arrayMove(banners, fromIdx, toIdx);
        banners.forEach(function (banner, idx) {
            banner.metadata.order = idx;
        });
        this.setState({banners: banners});
    };

    updateFeaturedCollectionsOrder = (fromIdx, toIdx) => {
        let featuredCollections = this.state.featuredCollections;
        arrayMove(featuredCollections, fromIdx, toIdx);
        featuredCollections.forEach(function (collection, idx) {
            collection.metadata.homepageFeaturedOrder = idx;
        });
        this.setState({featuredCollections: featuredCollections});
    };

    //*** View Controllers ***//

    handleMoveFeaturedCollectionsLeftClick = (idx) => {
        if (idx > 0) {
            this.updateFeaturedCollectionsOrder(idx, idx-1);
        }
    };

    handleMoveFeaturedCollectionsRightClick = (idx) => {
        if (idx < this.state.featuredCollections.length-1) {
            this.updateFeaturedCollectionsOrder(idx, idx+1);
        }
    };

    handleFeaturedCollectionsUpdateClick = () => {
        this.context.executeAction(updateHomepageFeaturedCollections, this.state.featuredCollections);
    };

    handleMoveBannerLeftClick = (idx) => {
        if (idx > 0) {
            this.updateBannersOrder(idx, idx-1);
        }
    };

    handleMoveBannerRightClick = (idx) => {
        if (idx < this.state.banners.length-1) {
            this.updateBannersOrder(idx, idx+1);
        }
    };

    handleBannerUpdateClick = () => {
        this.context.executeAction(bulkBannersUpdate, this.state.banners);
    };

    //*** Template ***//

    render() {

        let intlStore = this.context.getStore(IntlStore);

        let featuredCollectionsOptions = this.state.collections.map(function (collection) {
            return {
                name: intlStore.getMessage(collection.name),
                value: collection.id
            };
        });

        return (
            <div className="admin-homepage-settings">
                <div className="admin-homepage-settings__ordering-block">
                    <div className="admin-homepage-settings__ordering-label">
                        <FormLabel>
                            <FormattedMessage message={intlStore.getMessage(intlData, 'orderBanners')}
                                              locales={intlStore.getCurrentLocale()} />
                        </FormLabel>
                    </div>
                    <div className="admin-homepage-settings__ordering">
                        <div className="admin-homepage-settings__ordering-items">
                            {this.state.banners.map((banner, idx) => {
                                return (
                                    <DirectionButton key={idx}
                                                     item={banner}
                                                     handleMoveLeftClick={this.handleMoveBannerLeftClick.bind(null, idx)}
                                                     handleMoveRightClick={this.handleMoveBannerRightClick.bind(null, idx)} />
                                );
                            })}
                        </div>
                        <div className="admin-homepage-settings__ordering-actions">
                            <Button className="admin-homepage-settings__ordering-button"
                                    type="primary"
                                    onClick={this.handleBannerUpdateClick}
                                    loading={this.state.loading}>
                                <FormattedMessage
                                    message={intlStore.getMessage(intlData, 'update')}
                                    locales={intlStore.getCurrentLocale()} />
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="admin-homepage-settings__ordering-block">
                    <div className="admin-homepage-settings__ordering-label">
                        <FormLabel>
                            <FormattedMessage message={intlStore.getMessage(intlData, 'homepageFeaturedCollections')}
                                              locales={intlStore.getCurrentLocale()} />
                        </FormLabel>
                    </div>
                    <div className="admin-homepage-settings__ordering">
                        <div className="admin-homepage-settings__ordering-items">
                            {this.state.featuredCollections.map((collection, idx) => {
                                return (
                                    <DirectionButton key={idx}
                                                     item={collection}
                                                     handleMoveLeftClick={this.handleMoveFeaturedCollectionsLeftClick.bind(null, idx)}
                                                     handleMoveRightClick={this.handleMoveFeaturedCollectionsRightClick.bind(null, idx)} />
                                );
                            })}
                        </div>
                        <div className="admin-homepage-settings__ordering-actions">
                            <Button className="admin-homepage-settings__ordering-button"
                                    type="primary"
                                    onClick={this.handleFeaturedCollectionsUpdateClick}
                                    disabled={this.state.featuredUpdate.loading}>
                                <FormattedMessage
                                    message={intlStore.getMessage(intlData, 'update')}
                                    locales={intlStore.getCurrentLocale()} />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * Flux
 */
AdminHomepageSettings = connectToStores(AdminHomepageSettings, [
    CollectionsStore,
    CollectionsFeaturedHomepage,
    ContentsListStore
], (context) => {
    return {
        _banners: context.getStore(ContentsListStore).getOrderedContentsOfType('banner', ['homepage'], true),
        _collections: context.getStore(CollectionsStore).getCollections([], true),
        _featuredCollections: context.getStore(CollectionsStore).getOrderedCollections(['homepageFeatured'], true, 'homepageFeaturedOrder'),
        _featuredUpdate: context.getStore(CollectionsFeaturedHomepage).getState()
    };
});

/**
 * Exports
 */
export default AdminHomepageSettings;
