/**
 * Imports
 */
import BaseStore from 'fluxible/addons/BaseStore';
import applicationActions from '../../constants/application';

/**
 * Store
 */
class DrawerStore extends BaseStore {

    static storeName = 'DrawerStore';

    static handlers = {
        [applicationActions.APPLICATION_DRAWER_TRIGGER]: 'handleDrawerTrigger'
    };

    constructor(dispatcher) {
        super(dispatcher);
        this.openedDrawer = undefined;
    }

    getState() {
        return {
            openedDrawer: this.openedDrawer
        }
    }

    //
    // Isomorphic stuff
    //

    dehydrate() {
        return this.getState();
    }

    rehydrate(state) {
        this.openedDrawer = state.openedDrawer;
    }

    //
    // Getters
    //

    getOpenedDrawer() {
        return this.openedDrawer;
    }

    //
    // Handlers
    //

    handleDrawerTrigger(payload) {
        if (payload === this.openedDrawer) {
            this.openedDrawer = null;
        } else {
            this.openedDrawer = payload;
        }
        this.emitChange();
    }
}

/**
 * Export
 */
export default DrawerStore;
