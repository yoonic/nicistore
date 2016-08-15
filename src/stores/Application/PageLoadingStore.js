/**
 * Imports
 */
import BaseStore from 'fluxible/addons/BaseStore';
import applicationActions from '../../constants/application';

/**
 * Store
 */
class PageLoadingStore extends BaseStore {

    static storeName = 'PageLoadingStore';

    static handlers = {
        [applicationActions.APPLICATION_PAGE_LOADING_TRIGGER]: 'handleLoadingTrigger'
    };

    constructor(dispatcher) {
        super(dispatcher);
        this.loading = false;
        this.trigger = undefined;
    }

    getState() {
        return {
            loading: this.loading
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
    }

    //
    // Getters
    //

    isLoading() {
        return this.loading === true;
    }

    //
    // Handlers
    //

    handleLoadingTrigger(payload) {
        clearTimeout(this.trigger);
        if (payload === false) {
            this.loading = false;
            this.emitChange();
        } else {
            this.trigger = setTimeout(() => {
                this.loading = true;
                this.emitChange();
            }, 500);
        }
    }
}

/**
 * Export
 */
export default PageLoadingStore;
