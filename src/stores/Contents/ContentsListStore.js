/**
 * Imports
 */
import BaseStore from 'fluxible/addons/BaseStore';
import contentActions from '../../constants/contents';

/**
 * Store
 */
class ContentsListStore extends BaseStore {

    static storeName = 'ContentsListStore';

    static handlers = {
        [contentActions.CONTENTS_FIND]: 'handleListRequest',
        [contentActions.CONTENTS_FIND_SUCCESS]: 'handleListSuccess',
        [contentActions.CONTENTS_FIND_ERROR]: 'handleListError'
    };

    constructor(dispatcher) {
        super(dispatcher);
        this.loading = false;
        this.error = undefined;
        this.contents = undefined;
    }

    getState() {
        return {
            loading: this.loading,
            error: this.error,
            contents: this.contents
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
        this.contents = state.contents;
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

    getContents() {
        if (this.contents && this.contents.items) {
            return this.contents.items;
        } else {
            return [];
        }
    }

    /**
     * Returns the contents that contain all of the given tags
     * @param {array} tags
     * @param {boolean} enabled - Return only the ones that are enabled
     */
    getContentsWithTags(tags, enabled) {
        tags = tags || [];
        if (this.contents && this.contents.items) {
            return this.contents.items.filter(function (item) {
                let containsAllTags = tags.every(function(val) { return item.tags.indexOf(val) >= 0; });
                return (enabled === true) ? item.enabled && containsAllTags : containsAllTags;
            });
        } else {
            return [];
        }
    }

    /**
     * Returns the contents ordered by the "order" metadata value
     */
    getOrderedContents(tags, enabled) {
        let contents = (tags) ? this.getContentsWithTags(tags, enabled) : this.getContents();
        contents.sort(function (a, b) {
            if (a.metadata.order < b.metadata.order)
                return -1;
            else if (a.metadata.order > b.metadata.order || !a.metadata.order)
                return 1;
            else
                return 0;
        });
        return contents;
    }

    /**
     * Returns the contents of given type ordered by the "order" metadata value
     * @param type - content type
     * @param tags - (optional) array of tags that content must have
     * @param enabled -  (optional) boolean stating that contents should either be enabled or disabled. If not provided, both are considered.
     */
    getOrderedContentsOfType(type, tags, enabled) {
        return this.getOrderedContents(tags, enabled).filter(c => c.type === type);
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
        this.contents = payload;
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
export default ContentsListStore;
