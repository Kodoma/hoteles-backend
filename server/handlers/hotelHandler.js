var express = require("express"),
    app = express();
var mongoose = require('mongoose');
var config = require('../config').conf;
var options = {
    useNewUrlParser: true,
    server: {
        socketOptions: {
            keepAlive: 300000,
            connectTimeoutMS: 30000
        }
    },
    replset: {
        socketOptions: {
            keepAlive: 300000,
            connectTimeoutMS: 30000
        }
    }
};
// Import Models
var modelsHotel = require('../models/hotel')(app, mongoose);

// Connection to DB
mongoose.connect(config.mongodb,options);

var conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));  
 
conn.once('open', () =>{
 console.log('connected to adatabase')                       
});

function setModel(req) {
    return conn.model('hotel');
}

//GET - Return all documents in the DB
exports.findAllDocuments = function (req, res) {
    var Document =setModel(req);
    var query = {};
    var queryStrig = require('url').parse(req.url, true).query;

    if (queryStrig.stars) {
        query.stars = queryStrig.stars
    }

    if (queryStrig.name) {
        query.name = queryStrig.name
    }

    Document.find(query, null, null, function (err, documents) {
        if (err) res.send(500, err.message);
        console.log(new Date());
        console.log('GET /' + req.params.collection);
        res.status(200).jsonp(documents);
    });
};



//GET - Return a document with specified ID
exports.findById = function (req, res) {
    var Document = setModel(req);

    var query = {};
    var queryString = require('url').parse(req.url, true).query;

    if (req.params.id) {
        query = {"id": req.params.id};
    }

    Document.findOne(query, function (err, document) {
        if (err) return res.status(500).send(err.message);
        console.log(new Date());
        console.log('GET /' + req.params.collection + '/' + req.params.id);
        res.status(200).jsonp(document);

    });
};



//POST - Insert a new Document in the DB
exports.addDocument = function (req, res) {
    var Document = setModel(req);
    console.log(new Date());
    console.log('POST');
    document = new Document(req.body);
    console.log(document);
    document.save(function (err, document) {
        if (err) return res.status(500).send(err.message);
        res.status(200).jsonp(document);
    });
};

//PUT - Update a register already exists
exports.updateDocument = function (req, res) {

    var Document = setModel(req);
    Document.findById(req.params.id, function (err, document) {
        var keepThis = ['_id', '__v', 'id'];
        var newDoc = req.body;
        for (var key in newDoc) {
            keepThis.push(key);
        }
        for (var field in Document.schema.paths) {
            if (field.indexOf('_') === 0) {
                continue;
            }
            if (keepThis.indexOf(field) !== -1) {
                document[field] = newDoc[field];
                continue;
            }
            document[field] = undefined;
        }
        document.save(function (err, document) {
            if (err) return res.status(500).send(err.message);
            console.log(new Date());
            console.log('PUT');
            console.log(document);
            res.status(200).jsonp(document);
        });

    });
};

//DELETE - Delete a document with specified ID
exports.deleteDocument = function (req, res) {
    console.log(new Date());
    console.log('DELETE /' + req.params.collection + '/' + req.params.id);
    var Document = setModel(req);
    Document.findById(req.params.id, function (err, document) {
        document.remove(function (err) {
            if (err) return res.send(500, err.message);
            res.status(200).jsonp(document);
        });
    });
};