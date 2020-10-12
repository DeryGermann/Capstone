module.exports = function(app) {
    const accountController = require('./controllers/controllerAccount')
    const securityController = require('./controllers/controllerSecurity');

    // Key
    // 90e5dc53-ba26-4a92-85b1-9c2375ff1495

    app.route('/').get(accountController.root);
    app.route('/accounts')
    // Lists all records
    .get(accountController.account__listall)
    // Creates new record
    .post(accountController.account__create);
    // // Update
    // app.route('/records/:recordid').put(recordController.record__updateRecord);
    // // Delete
    // app.route('/records/:recordid').delete(recordController.record__deleteRecord);

    // app.route('/security')
    // .get(securityController.apikey__listall)
    // .post(securityController.apikey_create);
}