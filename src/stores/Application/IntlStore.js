/**
 * Imports
 */
import BaseStore from 'fluxible/addons/BaseStore';
import applicationActions from '../../constants/application';

import config from '../../config';

/**
 * Store
 */
class IntlStore extends BaseStore {

    static storeName = 'IntlStore';

    static handlers = {
        [applicationActions.APPLICATION_LOCALE_SET]: 'handleLocaleSet'
    };

    constructor(dispatcher) {
        super(dispatcher);
        this.currentLocale = undefined;
        this.availableLocales = config.app.locale.available;
        this.defaultLocale = config.app.locale.default;
    }

    getState() {
        return {
            currentLocale: this.currentLocale,
            availableLocales: this.availableLocales,
            defaultLocale: this.defaultLocale
        }
    }

    //
    // Isomorphic stuff
    //

    dehydrate() {
        return this.getState();
    }

    rehydrate(state) {
        this.currentLocale = state.currentLocale;
        this.availableLocales = state.availableLocales;
        this.defaultLocale = state.defaultLocale;
    }

    //
    // Getters
    //

    getCurrentLocale() {
        return this.currentLocale;
    }

    getAvailableLocales() {
        return this.availableLocales;
    }

    getDefaultLocale() {
        return this.defaultLocale;
    }

    /**
     * Fetch message for given key/locale. Defaults to content for default locale if current does
     * not have translation.
     * @param intlData - Object containing, per locale, another object with respective message content
     * @param key - Key of the message requested
     *
     * 1) The default expected structure for "intlData" is:
     * {
     *   en: {
     *     message1: "message1 content in English",
     *     message2: "message2 content in English"
     *   },
     *   pt: {
     *     message1: "message1 content in Portuguese",
     *     message2: "message2 content in Portuguese"
     *   }
     * }
     *
     * 2) But... if "key" is not provided, then it is assumed that the intl object has only one message per locale:
     * {
     *   en: "message content in English",
     *   pt: "message content in Portuguese"
     * }
     *
     */
    getMessage(intlData, key) {
        let message;

        //
        // a) Key requested
        //
        if (key) {

            // i) Check for content for current locale
            if (intlData[this.currentLocale] && intlData[this.currentLocale][key]) {
                message = intlData[this.currentLocale][key];
            }
            // ii) Try default locale
            else if (intlData[this.defaultLocale] && intlData[this.defaultLocale][key]) {
                message = intlData[this.defaultLocale][key];
                // When not in production, add warning message to default content
                if (process.env.NODE_ENV !== 'production') {
                    message = '[Missing Translation] ' + message;
                }
            }
        }

        //
        // b) No key
        //
        else {

            // i) Check for content for current locale
            if (intlData[this.currentLocale]) {
                message = intlData[this.currentLocale];
            }
            // ii) Try default locale
            else if (intlData[this.defaultLocale]) {
                message = intlData[this.defaultLocale];
                // When not in production, add warning message to default content
                if (process.env.NODE_ENV !== 'production') {
                    message = '[Missing Translation] ' + message;
                }
            }
        }

        // No content for either current and default locales. Even in production,
        // display warning message (better than crashing React/Intl because of returning "undefined")
        if (!message) {
            message = '[Missing Translation]';
        }

        //
        // Return
        //
        return message;
    }

    //
    // Handlers
    //

    handleLocaleSet(payload) {
        this.currentLocale = payload;
        this.emitChange();
    }
}

/**
 * Export
 */
export default IntlStore;
