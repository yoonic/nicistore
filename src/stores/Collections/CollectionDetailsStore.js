/**
 * Imports
 */
import BaseStore from 'fluxible/addons/BaseStore';
import collectionActions from '../../constants/collections';

/**
 * Store
 */
class CollectionDetailsStore extends BaseStore {

    static storeName = 'CollectionDetailsStore';

    static handlers = {
        [collectionActions.COLLECTIONS_ITEM]: 'handleRequest',
        [collectionActions.COLLECTIONS_ITEM_SUCCESS]: 'handleSuccess',
        [collectionActions.COLLECTIONS_ITEM_ERROR]: 'handleError',
        [collectionActions.COLLECTIONS_ITEM_SAVE]: 'handleRequest',
        [collectionActions.COLLECTIONS_ITEM_SAVE_SUCCESS]: 'handleSuccess',
        [collectionActions.COLLECTIONS_ITEM_SAVE_ERROR]: 'handleError'
    };

    constructor(dispatcher) {
        super(dispatcher);
        this.loading = false;
        this.error = undefined;
        this.collection = undefined;
    }

    getState() {
        return {
            loading: this.loading,
            error: this.error,
            collection: this.collection
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
        this.collection = state.collection;
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

    getCollection() {
        return this.collection;
    }

    //
    // Handlers
    //

    handleRequest() {
        this.loading = true;
        this.emitChange();
    }

    handleSuccess(payload) {
        this.loading = false;
        this.error = null;
        this.collection = payload;
        this.emitChange();
    }

    handleError(payload) {
        this.loading = false;
        this.error = payload;
        this.emitChange();
    }
}

/**
 * Export
 */
export default CollectionDetailsStore;
