/**
 * Imports
 */
import superagent from 'superagent';

/**
 * Atlas Orders API wrapper
 */
class OrdersAPI {

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
     * Create new Order
     */
    create(checkoutId, cartAccessToken, data) {
        return new Promise((resolve, reject) => {
            let payload = {checkoutId: checkoutId};
            if (data) {
                payload = Object.assign(payload, data);
            }
            let request = superagent.post(`${this.baseUrl}/orders`).send(payload);
            if (cartAccessToken) {
                request.query({accessToken: cartAccessToken});
            }
            this._wrapAndRequest(request, resolve, reject);
        });
    }

    /**
     * Orders collection
     */
    find(params) {
        return new Promise((resolve, reject) => {
            let request = superagent.get(`${this.baseUrl}/orders`).query(params || {});
            this._wrapAndRequest(request, resolve, reject);
        });
    }

    /**
     * Fetch Order with given ID
     */
    get(orderId) {
        return new Promise((resolve, reject) => {
            let request = superagent.get(`${this.baseUrl}/orders/${orderId}`);
            this._wrapAndRequest(request, resolve, reject);
        });
    }

    /**
     * Trigger sending of email template in regard to given order ID
     */
    sendEmail(orderId, data) {
        return new Promise((resolve, reject) => {
            let request = superagent.post(`${this.baseUrl}/orders/${orderId}/email`).send(data);
            this._wrapAndRequest(request, resolve, reject);
        });
    }

    /**
     *
     * @param orderId
     * @param status - the new status
     * @param description - description regarding the status change
     */
    updateStatus(orderId, status, description) {
        return new Promise((resolve, reject) => {
            let request = superagent.patch(`${this.baseUrl}/orders/${orderId}`).send({status, description});
            this._wrapAndRequest(request, resolve, reject);
        });
    }
}

/**
 * Exports
 */
export default OrdersAPI;
