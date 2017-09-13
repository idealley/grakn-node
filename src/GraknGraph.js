const request = require('request-promise-native');

var DEFAULT_URI = 'http://localhost:4567';
var DEFAULT_KEYSPACE = 'grakn';
var EXECUTE_WEBPATH = '/graph/graql/execute';

var uri,keyspace;

function Graph(uri = DEFAULT_URI , keyspace = DEFAULT_KEYSPACE){
    this.uri = uri;
    this.keyspace = keyspace;
}

// Execute Graql query against the graph
Graph.prototype.execute = function(query, infer = true, materialise= false){
    var options = {
        uri: this.uri + EXECUTE_WEBPATH, 
        qs: params(this.keyspace, infer, materialise), 
        headers: {'Accept': 'application/graql+json'},
        body: query,
    };

    return request.post(options);
}

function params(keyspace, infer, materialise){
    return {'keyspace': keyspace, 'infer': infer, 'materialise': materialise};
}

module.exports = Graph;