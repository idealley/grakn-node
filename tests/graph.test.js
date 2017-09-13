var gc = require('../src/GraknGraph');

const query = 'match $x sub concept; limit 3;'

const mockExpectedResponse = [
    {'id': 'a', 'label': 'concept'},
    {'id': 'b', 'label': 'entity'},
    {'id': 'c', 'label': 'resource'}
];

jest.mock('request-promise-native', () => ({
    post() { return Promise.resolve(mockExpectedResponse); },
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
    beforeAll(()=>{ graph = new gc(); });

    test('Executing a valid query returns expected response', ()=>{
        graph.execute(query).then(resp=>{
            expect(resp).toBe(mockExpectedResponse);
        });
    });
    
});