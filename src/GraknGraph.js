const request = require('request-promise-native');

const DEFAULT_URI = 'http://localhost:4567';
const DEFAULT_KEYSPACE = 'grakn';

function Graph(uri = DEFAULT_URI, keyspace = DEFAULT_KEYSPACE) {
    this.uri = uri;
    this.keyspace = keyspace;
    this.defaultParams = {
        'infer': true,
        'multi': false,
        'defineAllVars': false,
        'loading': false,
        'txType': 'WRITE'
    };
}

/**
 * The type of the transaction
 * @enum {string}
 */
Graph.prototype.TxType = {
    READ: "READ",
    WRITE: "WRITE",
    BATCH: "BATCH"
};

Graph.prototype.queryEndpoint = function(keyspace){
    return `/kb/${keyspace}/graql`;
}

/**
 * Execute Graql query against the graph
 * @param {string} query 
 * @param {Object} params
 */
Graph.prototype.execute = function (query, params = {}, keyspace = this.keyspace) {

    params = createMergedParamsObject(this.defaultParams, params);

    return request.post({
        uri: `${this.uri}${this.queryEndpoint(keyspace)}`,
        qs: params,
        headers: { 'Accept': 'application/graql+json' },
        body: query
    });
}

/**
 * Creates a params object that will be passed to execute()
 * @param {string} keyspace
 * @param {boolean} infer - Run the query with reasoning on or off
 * @param {boolean} multi - Allow multiple queries to be executed
 * @param {boolean} defineAllVars - Define all anonymous variables in the query
 * @param {boolean} loading - Used to check if serialisation of results is needed. When loading we skip this for the sake of speed
 * @param {string} txType 
 */
function createMergedParamsObject(defaultParams, params) {
    return {
        'infer': params.infern || defaultParams.infer,
        'multi': params.multi || defaultParams.multi,
        'defineAllVars': params.defineAllVars || defaultParams.defineAllVars,
        'loading': params.loading || defaultParams.loading,
        'txType': params.txType || defaultParams.txType
    };
}

module.exports = Graph;