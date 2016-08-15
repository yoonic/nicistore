/**
 * Imports
 */
import superagent from 'superagent';

/**
 * Atlas Account API wrapper
 */
class AccountAPI {

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
     * Login user account
     */
    login(payload) {
        return new Promise((resolve, reject) => {
            let request = superagent.post(`${this.baseUrl}/account/login`).send(payload);
            this._wrapAndRequest(request, resolve, reject);
        });
    }

    /**
     * Get the user account details
     */
    get() {
        return new Promise((resolve, reject) => {
            let request = superagent.get(`${this.baseUrl}/account`);
            this._wrapAndRequest(request, resolve, reject);
        });
    }

    /**
     * Register a new user account
     */
    register(payload) {
        return new Promise((resolve, reject) => {
            let request = superagent.post(`${this.baseUrl}/account/register`).send(payload);
            this._wrapAndRequest(request, resolve, reject);
        });
    }

    /**
     * Confirms a new account email
     */
    confirm(token) {
        return new Promise((resolve, reject) => {
            let request = superagent.patch(`${this.baseUrl}/account/register`).send({token});
            this._wrapAndRequest(request, resolve, reject);
        });
    }

    /**
     * Update the user's account details
     */
    update(payload) {
        return new Promise((resolve, reject) => {
            let request = superagent.patch(`${this.baseUrl}/account`).send(payload);
            this._wrapAndRequest(request, resolve, reject);
        });
    }

    /**
     * Request a password reset
     */
    resetRequest(email) {
        return new Promise((resolve, reject) => {
            let request = superagent.post(`${this.baseUrl}/account/reset`).send({email});
            this._wrapAndRequest(request, resolve, reject);
        });
    }

    /**
     * Confirm a reset, updating the account's password
     */
    resetConfirm(token, password) {
        return new Promise((resolve, reject) => {
            let request = superagent.patch(`${this.baseUrl}/account/reset`).send({token, password});
            this._wrapAndRequest(request, resolve, reject);
        });
    }
}

/**
 * Exports
 */
export default AccountAPI;
