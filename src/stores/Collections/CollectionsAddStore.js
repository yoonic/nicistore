/**
 * Imports
 */
import BaseStore from 'fluxible/addons/BaseStore';
import collectionActions from '../../constants/collections';

/**
 * Store
 */
class CollectionsAddStore extends BaseStore {

    static storeName = 'CollectionsAddStore';

    static handlers = {
        [collectionActions.COLLECTIONS_ADD]: 'handleAddRequest',
        [collectionActions.COLLECTIONS_ADD_SUCCESS]: 'handleAddSuccess',
        [collectionActions.COLLECTIONS_ADD_ERROR]: 'handleAddError'
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

    handleAddRequest() {
        this.loading = true;
        this.emitChange();
    }

    handleAddSuccess(payload) {
        this.loading = false;
        this.error = null;
        this.collection = payload;
        this.emitChange();
    }

    handleAddError(payload) {
        this.loading = false;
        this.error = payload;
        this.emitChange();
    }
}

/**
 * Export
 */
export default CollectionsAddStore;
