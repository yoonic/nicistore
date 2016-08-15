/**
 * Imports
 */
import superagent from 'superagent';

/**
 * Atlas Collections API wrapper
 */
class CollectionsAPI {

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
     * Create new Collection
     */
    create(payload) {
        return new Promise((resolve, reject) => {
            let request = superagent.post(`${this.baseUrl}/collections`).send(payload);
            this._wrapAndRequest(request, resolve, reject);
        });
    }

    /**
     * Collections collection
     */
    find(params) {
        return new Promise((resolve, reject) => {
            let request = superagent.get(`${this.baseUrl}/collections`).query(params || {});
            this._wrapAndRequest(request, resolve, reject);
        });
    }

    /**
     * Fetch Collection with given ID
     */
    get(collectionId) {
        return new Promise((resolve, reject) => {
            let request = superagent.get(`${this.baseUrl}/collections/${collectionId}`);
            this._wrapAndRequest(request, resolve, reject);
        });
    }

    /**
     * Fetch all the Collections
     */
    getAll() {
        return new Promise((resolve, reject) => {
            let request = superagent.get(`${this.baseUrl}/collections`);
            this._wrapAndRequest(request, resolve, reject);
        });
    }

    /**
     * Update Collection
     */
    update(collectionId, payload) {
        return new Promise((resolve, reject) => {
            let request = superagent.put(`${this.baseUrl}/collections/${collectionId}`).send(payload);
            this._wrapAndRequest(request, resolve, reject);
        });
    }
}

/**
 * Exports
 */
export default CollectionsAPI;
