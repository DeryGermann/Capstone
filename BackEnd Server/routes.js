module.exports = function(app) {
    const recordController = require('./controllers/controllerRecord')
    const securityController = require('./controllers/controllerSecurity')

    app.route('/').get(recordController.root);
    app.route('/records')
    // Lists all records
    .get(recordController.record__listall)
    // Creates new record
    .post(recordController.record__create);
    // Update
    app.route('/records/:recordid').put(recordController.record__updateRecord);
    // Delete
    app.route('/records/:recordid').delete(recordController.record__deleteRecord);

    app.route('/apikey')
    .get(securityController.apikey__listall)
    .post(securityController.apikey__generatekey);
}