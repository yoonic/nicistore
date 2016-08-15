/**
 * Imports
 */
import superagent from 'superagent';

/**
 * Atlas Checkouts API wrapper
 */
class CheckoutsAPI {

    /**
     * Constructor
     * @param options - Object containing ATLAS settings
     * @param getAuthToken - Method that returns the Authorization token
     */
    constructor({options, getAuthToken}) {
        this.baseUrl = options.baseUrl;
        this.getAuthToken = getAuthToken;
    }

    /**
     * All API calls should be wrapped/handled/called by this in method order
     * for any common additional stuff to be done (e.g. adding Authorization headers)
     */
    _wrapAndRequest(request, resolve, reject) {
        if (this.getAuthToken()) {
            request.set('Authorization', this.getAuthToken());
        }
        request.end(function (err, result) {
            if (err) {
                reject({status: err.status, result: (result) ? result.body : null});
            } else {
                resolve(result.body);
            }
        });
    }

    /**
     * Create new Checkout
     */
    create(cartId, cartAccessToken, data) {
        return new Promise((resolve, reject) => {
            let payload = {cartId: cartId};
            if (data) {
                payload = Object.assign(payload, data);
            }
            let request = superagent.post(`${this.baseUrl}/checkouts`).send(payload);
            if (cartAccessToken) {
                request.query({accessToken: cartAccessToken});
            }
            this._wrapAndRequest(request, resolve, reject);
        });
    }

    /**
     * Partial Checkout updates
     */
    patch(checkoutId, payload, cartAccessToken) {
        return new Promise((resolve, reject) => {
            let request = superagent.patch(`${this.baseUrl}/checkouts/${checkoutId}`).send(payload);
            if (cartAccessToken) {
                request.query({accessToken: cartAccessToken});
            }
            this._wrapAndRequest(request, resolve, reject);
        });
    }
}

/**
 * Exports
 */
export default CheckoutsAPI;
