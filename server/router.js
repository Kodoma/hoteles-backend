var express           = require("express");
var hotelHandler      = require('./handlers/hotelHandler');
const swaggerUi       = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
/**
 *  Sets up the routes.
 *  @param {object} app - Express app
 */
module.exports.setup = function (app) {

    // API routes
    var api = express.Router();

    api.route('/').get( function(req, res){res.status(200).jsonp("Hotel Api ");});

    api.route('/hotels')
        .get(hotelHandler.findAllDocuments)
        .post(hotelHandler.addDocument);

    api.route('/hotels/:id')
        .get(hotelHandler.findById)
        .put(hotelHandler.updateDocument)
        .delete(hotelHandler.deleteDocument);

    app.use('/', api);



    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


};
