import applicationActions from '../../constants/application';

module.exports = function (actionContext, payload, done) {
    actionContext.dispatch(applicationActions.APPLICATION_CHANGE_ROUTE, payload);
    done();
};
