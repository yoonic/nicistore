/**
 * Imports
 */
import BaseStore from 'fluxible/addons/BaseStore';
import collectionActions from '../../constants/collections';

/**
 * Store
 */
class CollectionsStore extends BaseStore {

    static storeName = 'CollectionsStore';

    static handlers = {
        [collectionActions.COLLECTIONS]: 'handleRequest',
        [collectionActions.COLLECTIONS_SUCCESS]: 'handleSuccess',
        [collectionActions.COLLECTIONS_ERROR]: 'handleError',

        [collectionActions.COLLECTIONS_ITEM_SAVE_SUCCESS]: 'handleItemSaveSuccess',

        [collectionActions.COLLECTIONS_BULK_SAVE]: 'handleBulkSaveRequest',
        [collectionActions.COLLECTIONS_BULK_SAVE_SUCCESS]: 'handleBulkSaveSuccess',
        [collectionActions.COLLECTIONS_BULK_SAVE_ERROR]: 'handleBulkSaveError'
    };

    constructor(dispatcher) {
        super(dispatcher);
        this.loading = false;
        this.error = undefined;
        this.collections = undefined;
        this.collectionTree = undefined;
    }

    getState() {
        return {
            loading: this.loading,
            error: this.error,
            collections: this.collections,
            collectionTree: this.collectionTree
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
        this.collectionTree = state.collectionTree;
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

    /**
     * Returns the collections that contain all of the given tags
     * @param {array} tags
     * @param {boolean} enabled - Return only the ones that are enabled
     */
    getCollections(tags, enabled) {
        tags = tags || [];
        if (this.collections && this.collections.items) {
            return this.collections.items.filter(function (item) {
                let containsAllTags = tags.every(function(val) { return item.tags.indexOf(val) >= 0; });
                return (enabled === true) ? item.enabled && containsAllTags : containsAllTags;
            });
        } else {
            return [];
        }
    }

    /**
     * Returns the collections ordered
     * @param {array} tags - specific tags the collections must have
     * @param {boolean} enabled - Return only the ones that are enabled
     * @param {string} orderingKey - (optional) the key from metadata that should be used to order (default: 'order')
     */
    getOrderedCollections(tags, enabled, orderingKey) {
        let collections = this.getCollections(tags, enabled);
        let _orderingKey = orderingKey || 'order';
        collections.sort(function (a, b) {
            if (a.metadata[_orderingKey] < b.metadata[_orderingKey])
                return -1;
            else if (a.metadata[_orderingKey] > b.metadata[_orderingKey] || !a.metadata[_orderingKey])
                return 1;
            else
                return 0;
        });
        return collections;
    }

    /**
     * Returns the collections organized top-down according to parent information
     */
    getCollectionsTree() {
        return this.collectionTree;
    }

    /**
     * Returns the ordered list of Main Navigation collections
     */
    getMainNavigationCollections() {
        let collections = this.getCollections(['mainNavigation']);
        collections.sort(function (a, b) {
            if (a.metadata.mainNavigationOrder < b.metadata.mainNavigationOrder)
                return -1;
            else if (a.metadata.mainNavigationOrder > b.metadata.mainNavigationOrder || !a.metadata.mainNavigationOrder)
                return 1;
            else
                return 0;
        });
        return collections;
    }

    /**
     * Returns the Collection with the given ID
     */
    getCollection(id) {
        if (this.collections && this.collections.items) {
            return this.collections.items.filter(function (item) {
                return item.id === id;
            })[0];
        } else {
            return null;
        }
    }

    //
    // Handlers
    //

    // Request List

    handleRequest() {
        this.loading = true;
        this.emitChange();
    }

    handleSuccess(payload) {
        this.loading = false;
        this.error = null;
        this.collections = payload;
        this._buildCollectionTree();
        this.emitChange();
    }

    handleError(payload) {
        this.loading = false;
        this.error = payload;
        this.emitChange();
    }

    // Item Update

    handleItemSaveSuccess(payload) {
        let updatedCollection = payload;
        if (this.collections && this.collections.items) {
            for (let i=0, len=this.collections.items.length; i<len; i++) {
                if (this.collections.items[i].id === updatedCollection.id) {
                    this.collections.items[i] = updatedCollection;
                }
            }
        }
        this._buildCollectionTree();
        this.emitChange();
    }

    // Bulk Update

    handleBulkSaveRequest() {
        this.loading = true;
        this.emitChange();
    }

    handleBulkSaveSuccess(payload) {
        this.loading = false;
        this.error = null;
        if (this.collections && this.collections.items) {
            payload.forEach((updatedCollection) => {
                for (let i=0, len=this.collections.items.length; i<len; i++) {
                    if (this.collections.items[i].id === updatedCollection.id) {
                        this.collections.items[i] = updatedCollection;
                    }
                }
            });
        }
        this._buildCollectionTree();
        this.emitChange();
    }

    handleBulkSaveError(payload) {
        this.loading = false;
        this.error = payload;
        this.emitChange();
    }

    //
    // Private methods
    //

    /**
     * Create a top-down collection tree from the current state of collections
     * @private
     */
    _buildCollectionTree() {
        if (!this.collections || !this.collections.items) {
            this.collectionTree =  [];
        } else {
            let collections = JSON.parse(JSON.stringify(this.collections.items));
            let addChildren = (collection) => {
                collection.children = collections.filter(c => c.parentId === collection.id);
                collection.children.forEach(c => addChildren(c));
            };
            let collectionTree = collections.filter(c => !c.parentId);
            collectionTree.forEach(c => addChildren(c));
            this.collectionTree = collectionTree;
        }
    }
}

/**
 * Export
 */
export default CollectionsStore;
