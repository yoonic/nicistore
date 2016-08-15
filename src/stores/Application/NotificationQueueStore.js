/**
 * Imports
 */
import BaseStore from 'fluxible/addons/BaseStore';
import applicationActions from '../../constants/application';

/**
 * This store maintains notifications in a First In First Out (FIFO) order
 */
class NotificationQueueStore extends BaseStore {

    static storeName = 'NotificationQueueStore';

    static handlers = {
        [applicationActions.APPLICATION_POP_NOTIFICATION]: 'handlePopNotification',
        [applicationActions.APPLICATION_POST_NOTIFICATION]: 'handlePostNotification'
    };

    constructor(dispatcher) {
        super(dispatcher);
        this.notifications = [];
    }

    getState() {
        return {
            notifications: this.notifications
        }
    }

    //
    // Isomorphic stuff
    //

    dehydrate() {
        return this.getState();
    }

    rehydrate(state) {
        this.notifications = state.notifications;
    }

    //
    // Getters
    //

    get() {
        return this.notifications[0];
    }

    pop() {
       return this.notifications.shift();
    }

    //
    // Handlers
    //

    handlePostNotification(payload) {
        this.notifications.push(payload);
        this.emitChange();
    }

    handlePopNotification(payload) {
        this.notifications.shift();
        this.emitChange();
    }
}

/**
 * Export
 */
export default NotificationQueueStore;
