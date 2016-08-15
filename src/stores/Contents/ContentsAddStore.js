/**
 * Imports
 */
import BaseStore from 'fluxible/addons/BaseStore';
import contentActions from '../../constants/contents';

/**
 * Store
 */
class ContentsAddStore extends BaseStore {

    static storeName = 'ContentsAddStore';

    static handlers = {
        [contentActions.CONTENTS_ADD]: 'handleAddRequest',
        [contentActions.CONTENTS_ADD_SUCCESS]: 'handleAddSuccess',
        [contentActions.CONTENS_ADD_ERROR]: 'handleAddError'
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

    handleAddRequest() {
        this.loading = true;
        this.emitChange();
    }

    handleAddSuccess(payload) {
        this.loading = false;
        this.error = null;
        this.content = payload;
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
export default ContentsAddStore;
