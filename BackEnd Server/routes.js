module.exports = function(app) {
    const accountController = require('./controllers/controllerAccount')
    const securityController = require('./controllers/controllerSecurity');

    // Account Table 
    app.route('/').get(accountController.root);
    app.route('/accounts')
    // Lists all accounts
    .get(accountController.account__listall)
    // Creates new account
    .post(accountController.account__create);
    // // Update account using account _id
    // app.route('/records/:recordid').put(recordController.record__updateRecord);
    // // Delete accout using account _id
    // app.route('/records/:recordid').delete(recordController.record__deleteRecord);

    // API Key stuff that will not be used after creating a single API Key
    // app.route('/security')
    // .get(securityController.apikey__listall)
    // .post(securityController.apikey_create);

    // Puzzle Table 

    // Public Table 

    // Incoming Requests Table 
}