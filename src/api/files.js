/**
 * Imports
 */
import superagent from 'superagent';

/**
 * Atlas Files API wrapper
 */
class FilesAPI {

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
     * Upload a new file
     */
    upload(resource, file) {
        return new Promise((resolve, reject) => {

            let formData = new FormData();
            formData.append('file', file);
            formData.append('resource', resource);

            let request = superagent.post(`${this.baseUrl}/files`).send(formData);
            this._wrapAndRequest(request, resolve, reject);
        });
    }
}

/**
 * Exports
 */
export default FilesAPI;
