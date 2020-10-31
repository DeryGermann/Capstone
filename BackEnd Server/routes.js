module.exports = function(app) {
    const accountController = require('./controllers/controllerAccount');
    const publicController = require('./controllers/controllerPublic');
    const puzzleController = require('./controllers/controllerPuzzle');
    const requestsController = require('./controllers/controllerRequests');
    // const securityController = require('./controllers/controllerSecurity');

    const apiController = require('./controllers/controllerApiData');

    // API containing all the information
    app.route('/getData').get(apiController.create_API);

    // Account Table 
    app.route('/').get(accountController.root);
    // Creates new account
    app.route('/accounts').post(accountController.account__create);
    app.route('/accounts/:accountid')
    // Lists all accounts
    .get(accountController.account__get)
    // Update account using account _id
    app.route('/accounts/:accountid').put(accountController.account__update);
    // Delete accout using account _id
    app.route('/accounts/:accountid').delete(accountController.account__delete);

    // API Key stuff that will not be used after creating a single API Key
    // app.route('/security')
    // .get(securityController.apikey__listall)
    // .post(securityController.apikey_create);

    // Puzzle Table 
    app.route('/puzzles')
    .get(puzzleController.puzzle__listall)
    .post(puzzleController.puzzle__create);
    app.route('/puzzles/:accountid/:puzzleid').put(puzzleController.puzzle__update);
    app.route('/puzzles/:accountid/personal/:name').delete(puzzleController.puzzle_personal_delete)
    app.route('/puzzles/:accountid/shared/:name').delete(puzzleController.puzzle_shared_delete);

    // Public Table 
    app.route('/public-puzzles')
    .post(publicController.public__create);
    app.route('/public-puzzles/:puzzleid')
    .delete(publicController.public_puzzle_delete);

    // Requests Table 
    app.route('/requests')
    .post(requestsController.request__create);
    app.route('/requests/:accountid')
    .delete(requestsController.requests__delete);
}