const request = require('request-promise-native');

var DEFAULT_URI = '127.0.0.1:4567';
var DEFAULT_KEYSPACE = 'grakn';

var uri,keyspace;

function GraknGraph(uri = DEFAULT_URI , keyspace = DEFAULT_KEYSPACE){
    this.uri = uri;
    this.keyspace = keyspace;
}

// Execute Graql query against the graph
GraknGraph.prototype.execute = function(query, infer = true, materialise= false){
    var options = {
        uri: 'http://'+this.uri+'/graph/graql/execute', 
        qs: params(this.keyspace, infer, materialise), 
        headers: {'Accept': 'application/graql+json'},
        body: query,
    };

    return request.post(options);
}

function params(keyspace, infer, materialise){
    return {'keyspace': keyspace, 'infer': infer, 'materialise': materialise};
}

module.exports = GraknGraph;