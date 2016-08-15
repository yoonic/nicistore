/**
 * Imports
 */
import BaseStore from 'fluxible/addons/BaseStore';
import collectionActions from '../../constants/collections';

/**
 * Store
 */
class CollectionsListStore extends BaseStore {

    static storeName = 'CollectionsListStore';

    static handlers = {
        [collectionActions.COLLECTIONS_FIND]: 'handleListRequest',
        [collectionActions.COLLECTIONS_FIND_SUCCESS]: 'handleListSuccess',
        [collectionActions.COLLECTIONS_FIND_ERROR]: 'handleListError'
    };

    constructor(dispatcher) {
        super(dispatcher);
        this.loading = false;
        this.error = undefined;
        this.collections = undefined;
    }

    getState() {
        return {
            loading: this.loading,
            error: this.error,
            collections: this.collections
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
        this.collections = state.collections;
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

    getCollections() {
        if (this.collections && this.collections.items) {
            return this.collections.items;
        } else {
            return [];
        }
    }

    //
    // Handlers
    //

    handleListRequest() {
        this.loading = true;
        this.emitChange();
    }

    handleListSuccess(payload) {
        this.loading = false;
        this.error = null;
        this.collections = payload;
        this.emitChange();
    }

    handleListError(payload) {
        this.loading = false;
        this.error = payload;
        this.emitChange();
    }
}

/**
 * Export
 */
export default CollectionsListStore;
