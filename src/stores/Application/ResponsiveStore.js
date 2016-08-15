/**
 * Imports
 */
import BaseStore from 'fluxible/addons/BaseStore';
import applicationActions from '../../constants/application';

/**
 * Constants
 */
const BREAK_SMALL = 768;
const BREAK_LARGE = 1024;

/**
 * Store
 */
class ResponsiveStore extends BaseStore {

    static storeName = 'ResponsiveStore';

    static handlers = {
        [applicationActions.APPLICATION_MOBILE_BREAKPOINT_SET]: 'handleSetMobile',
        [applicationActions.APPLICATION_PAGE_WIDTH_CHANGED]: 'handleWidthChange'
    };

    constructor (dispatcher) {
        super(dispatcher);
        this.breakpoint = 'handhelds'; // Default is "mobile-first"
    }

    getState() {
        return {
            breakpoint: this.breakpoint
        };
    }

    //
    // Isomorphic stuff
    //

    dehydrate() {
        return this.getState();
    }

    rehydrate(state) {
        this.breakpoint = state.breakpoint;
    }

    //
    // Getters
    //

    getBreakPoint() {
        return this.breakpoint;
    }

    //
    // Handlers
    //

    handleSetMobile(payload) {
        if (payload === true) {
            this.breakpoint = 'handhelds'
        } else {
            this.breakpoint = 'wide-screens';
        }
        this.emitChange();
    }

    handleWidthChange(payload) {
        let width = payload;
        let prevBreakpoint = this.breakpoint;

        if (width <= BREAK_SMALL) {
            this.breakpoint = 'handhelds';
        } else if (width > BREAK_SMALL && width < BREAK_LARGE) {
            this.breakpoint = 'medium-screens';
        } else {
            this.breakpoint = 'wide-screens';
        }

        if(this.breakpoint != prevBreakpoint) {
            this.emitChange();
        }
    }
}

/**
 * Export
 */
export default ResponsiveStore;
