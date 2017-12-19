const request = require('request-promise-native');

const DEFAULT_URI = 'http://localhost:4567';
const DEFAULT_KEYSPACE = 'grakn';

function Graph(uri = DEFAULT_URI , keyspace = DEFAULT_KEYSPACE){
    this.uri = uri;
    this.keyspace = keyspace
    this.query_endpoint = `/kb/${this.keyspace}/graql`;
}

// Execute Graql query against the graph
Graph.prototype.execute = function(query, infer = true, materialise = false){
    return request.post({
        uri: `${this.uri}${this.query_endpoint}`, 
        qs: params(this.keyspace, infer, materialise), 
        headers: {'Accept': 'application/graql+json'},
        body: query,
    });
}

function params(keyspace, infer, materialise){
    return {'keyspace': keyspace, 'infer': infer, 'materialise': materialise};
}

module.exports = Graph;