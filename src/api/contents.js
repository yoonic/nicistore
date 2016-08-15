/**
 * Imports
 */
import superagent from 'superagent';

/**
 * Atlas Contents API wrapper
 */
class ContentsAPI {

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
     * Create new Content
     */
    create(payload) {
        return new Promise((resolve, reject) => {
            let request = superagent.post(`${this.baseUrl}/contents`).send(payload);
            this._wrapAndRequest(request, resolve, reject);
        });
    }

    /**
     * Contents collection
     */
    find(params) {
        return new Promise((resolve, reject) => {
            let request = superagent.get(`${this.baseUrl}/contents`).query(params || {});
            this._wrapAndRequest(request, resolve, reject);
        });
    }

    /**
     * Fetch Content with given ID
     */
    get(contentId) {
        return new Promise((resolve, reject) => {
            let request = superagent.get(`${this.baseUrl}/contents/${contentId}`);
            this._wrapAndRequest(request, resolve, reject);
        });
    }

    /**
     * Update Content
     */
    update(contentId, payload) {
        return new Promise((resolve, reject) => {
            let request = superagent.put(`${this.baseUrl}/contents/${contentId}`).send(payload);
            this._wrapAndRequest(request, resolve, reject);
        });
    }

    /**
     * Add user comment to Content
     */
    addComment(contentId, message) {
        return new Promise((resolve, reject) => {
            let request = superagent.post(`${this.baseUrl}/contents/${contentId}/comments`).send({message});
            this._wrapAndRequest(request, resolve, reject);
        });
    }
}

/**
 * Exports
 */
export default ContentsAPI;
