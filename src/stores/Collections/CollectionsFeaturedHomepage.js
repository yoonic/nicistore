/**
 * Imports
 */
import BaseStore from 'fluxible/addons/BaseStore';
import collectionActions from '../../constants/collections';

/**
 * Store
 */
class CollectionsFeaturedHomepage extends BaseStore {

    static storeName = 'CollectionsFeaturedHomepage';

    static handlers = {
        [collectionActions.COLLECTIONS_HOMEPAGE_FEATURED_UPDATE]: 'handleUpdateRequest',
        [collectionActions.COLLECTIONS_HOMEPAGE_FEATURED_UPDATE_SUCCESS]: 'handleUpdateSuccess',
        [collectionActions.COLLECTIONS_HOMEPAGE_FEATURED_UPDATE_ERROR]: 'handleUpdateError'
    };

    constructor(dispatcher) {
        super(dispatcher);
        this.loading = false;
        this.error = undefined;
    }

    getState() {
        return {
            loading: this.loading,
            error: this.error
        }
    }

    //
    // Isomorphic stuff
    //

    dehydrate() {
        return this.getState();
    }

    rehydrate(state) {
        this.loading = state.loading;
        this.error = state.error;
    }

    //
    // Getters
    //

    isLoading() {
        return this.loading === true;
    }

    getError() {
        return this.error;
    }

    //
    // Handlers
    //

    handleUpdateRequest() {
        this.loading = true;
        this.emitChange();
    }

    handleUpdateSuccess(payload) {
        this.loading = false;
        this.error = null;
        this.emitChange();
    }

    handleUpdateError(payload) {
        this.loading = false;
        this.error = payload;
        this.emitChange();
    }
}

/**
 * Export
 */
export default CollectionsFeaturedHomepage;
