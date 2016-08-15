/**
 * Imports
 */
import BaseStore from 'fluxible/addons/BaseStore';
import fileActions from '../../constants/files';

/**
 * Store
 */
class FileUploadStore extends BaseStore {

    static storeName = 'FileUploadStore';

    static handlers = {
        [fileActions.FILES_UPLOAD]: 'handleRequest',
        [fileActions.FILES_UPLOAD_SUCCESS]: 'handleSuccess',
        [fileActions.FILES_UPLOAD_ERROR]: 'handleError'
    };

    constructor(dispatcher) {
        super(dispatcher);
        this.loading = false;
        this.error = undefined;
        this.file = undefined;
    }

    getState() {
        return {
            loading: this.loading,
            error: this.error,
            file: this.file
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
        this.file = state.file;
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

    getFile() {
        return this.file;
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
        this.file = payload;
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
export default FileUploadStore;
