/**
 * Imports
 */
import BaseStore from 'fluxible/addons/BaseStore';
import contentActions from '../../constants/contents';

/**
 * Store
 */
class ContentDetailsStore extends BaseStore {

    static storeName = 'ContentDetailsStore';

    static handlers = {
        [contentActions.CONTENTS_ITEM]: 'handleRequest',
        [contentActions.CONTENTS_ITEM_SUCCESS]: 'handleSuccess',
        [contentActions.CONTENTS_ITEM_ERROR]: 'handleError',
        [contentActions.CONTENTS_ITEM_SAVE]: 'handleRequest',
        [contentActions.CONTENTS_ITEM_SAVE_SUCCESS]: 'handleSuccess',
        [contentActions.CONTENTS_ITEM_SAVE_ERROR]: 'handleError'
    };

    constructor(dispatcher) {
        super(dispatcher);
        this.loading = false;
        this.error = undefined;
        this.content = undefined;
    }

    getState() {
        return {
            loading: this.loading,
            error: this.error,
            content: this.content
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
        this.content = state.content;
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

    getContent() {
        return this.content;
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
        this.content = payload;
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
export default ContentDetailsStore;
