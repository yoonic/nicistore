import fileActions from '../../constants/files';

export default function uploadFile(context, payload, done) {
    context.dispatch(fileActions.FILES_UPLOAD);
    context.api.files.upload(payload.resource, payload.file).then(function successFn(result) {
        context.dispatch(fileActions.FILES_UPLOAD_SUCCESS, result);
        done && done();
    }, function errorFn(err) {
        context.dispatch(fileActions.FILES_UPLOAD_ERROR, err.result);
        done && done();
    });
}
