/**
 * Imports.
 */
import async from 'async';

/**
 * Fetch data required for components involved in the given route,
 * according to the respective hierarchy.
 */
export default async function (context, state) {

    // Create the promises hash.
    let promises = state.routes.filter(function (route) {
        // Gather up the handlers that have a static `fetchData` method.
        return route.handler.fetchData;
    }).reduce(function (promises, route) {
        // Reduce to a hash of `key:promise`.
        promises[route.name] = route.handler.fetchData.bind(null, context, state.params, state.query);
        return promises;
    }, {});

    // Return promise required for this function to be async/await.
    return new Promise(function (resolve, reject) {
        // Series, so that the component hierarchy is respected when fetching data and only start the next
        // after previous was completed.
        async.series(promises, function (err, results) {
            if (err) {
                reject(err);
            } else {
                resolve(results);    
            }
        });
    });
};
