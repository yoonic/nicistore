/**
 * Imports
 */
import superagent from 'superagent';

/**
 * Atlas Carts API wrapper
 */
class CartsAPI {

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
     * Create new Cart
     */
    create() {
        return new Promise((resolve, reject) => {
            let request = superagent.post(`${this.baseUrl}/carts`);
            this._wrapAndRequest(request, resolve, reject);
        });
    }

    /**
     * Fetch Cart with given ID
     */
    get(cartId, cartAccessToken) {
        return new Promise((resolve, reject) => {
            let request = superagent.get(`${this.baseUrl}/carts/${cartId}`);
            if (cartAccessToken) {
                request.query({accessToken: cartAccessToken});
            }
            this._wrapAndRequest(request, resolve, reject);
        });
    }

    /**
     * Partial Cart updates
     */
    patch(cartId, payload, cartAccessToken) {
        return new Promise((resolve, reject) => {
            let request = superagent.patch(`${this.baseUrl}/carts/${cartId}`).send(payload);
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
export default CartsAPI;
