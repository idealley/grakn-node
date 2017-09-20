const gc = require('../src/GraknGraph');

const query = 'match $x sub concept; limit 3;'
const mockExpectedResponse = [
    {'id': 'a', 'label': 'concept'},
    {'id': 'b', 'label': 'entity'},
    {'id': 'c', 'label': 'resource'}
];
let currentRequestOptions;

jest.mock('request-promise-native', () => ({
    post(options) {
        currentRequestOptions = options; 
        return Promise.resolve(mockExpectedResponse); 
    },
}));

describe('Test Graph constructor', () => {
    test('Graph initialised with default values', () => {
        let graph = new gc();
        expect(('execute' in graph)).toBeTruthy();
        expect(graph.keyspace).toBe('grakn');
        expect(graph.uri).toBe('http://localhost:4567');
    });

    test('Graph accepts two arguments', () => {
        let graph = new gc('http://www.nasa.gov','nasa');
        expect(graph.keyspace).toBe('nasa');
        expect(graph.uri).toBe('http://www.nasa.gov');
    });
});


describe('Test query execution', () => {
    let graph;
    beforeAll(()=>{ graph = new gc('http://test-url.com','testkeyspace'); });

    test('Executing a valid query returns expected response', ()=>{
        graph.execute(query).then(resp=>{
            expect(resp).toBe(mockExpectedResponse);
        });
    });

    test('Executing a query sends request to expected URI', () => {
        graph.execute(query);
        expect(currentRequestOptions.uri).toBe('http://test-url.com/graph/graql/execute');
    });

    test('Executing a query sends expected headers', () => {
        graph.execute(query);
        expect(currentRequestOptions.headers.Accept).toBe('application/graql+json');
    });

    test('Executing a query sends query in body', () => {
        graph.execute(query);
        expect(currentRequestOptions.body).toBe(query);
    });

    test('Executing a query sends keyspace in params', () => {
        graph.execute(query);
        expect(currentRequestOptions.qs.keyspace).toBe('testkeyspace');
    });

    test('Executing a query sends infer in params', () => {
        graph.execute(query);
        expect(currentRequestOptions.qs.infer).toBe(true);
    });

    test('Executing a query sends materialise in params', () => {
        graph.execute(query);
        expect(currentRequestOptions.qs.materialise).toBe(false);
    });
    
});
