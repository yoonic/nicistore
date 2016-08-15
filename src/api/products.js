/**
 * Imports
 */
import superagent from 'superagent';

/**
 * Atlas Products API wrapper
 */
class ProductsAPI {

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
     * Create Product
     */
    create(payload) {
        return new Promise((resolve, reject) => {
            let request = superagent.post(`${this.baseUrl}/products`).send(payload);
            this._wrapAndRequest(request, resolve, reject);
        });
    }

    /**
     * Product collection
     */
    find(params) {
        return new Promise((resolve, reject) => {
            let request = superagent.get(`${this.baseUrl}/products`).query(params || {});
            this._wrapAndRequest(request, resolve, reject);
        });
    }

    /**
     * Fetch Product with given ID
     */
    get(productId) {
        return new Promise((resolve, reject) => {
            let request = superagent.get(`${this.baseUrl}/products/${productId}`);
            this._wrapAndRequest(request, resolve, reject);
        });
    }

    /**
     * Update Product
     */
    update(productId, payload) {
        return new Promise((resolve, reject) => {
            let request = superagent.put(`${this.baseUrl}/products/${productId}`).send(payload);
            this._wrapAndRequest(request, resolve, reject);
        });
    }

    /**
     * Upload product information
     */
    upload(resource, file) {
        return new Promise((resolve, reject) => {

            let formData = new FormData();
            formData.append('file', file);
            formData.append('resource', resource);

            let request = superagent.post(`${this.baseUrl}/products/upload`).send(formData);
            this._wrapAndRequest(request, resolve, reject);
        });
    }
}

/**
 * Exports
 */
export default ProductsAPI;
