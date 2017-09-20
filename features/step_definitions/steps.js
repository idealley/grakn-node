const Grakn = require('../../src/GraknGraph');
const {defineSupportCode} = require('cucumber');
const expect = require('chai').expect;
const environment = require('../support/environment');

defineSupportCode(function({Given, When, Then, AfterAll, BeforeAll}) {
    BeforeAll(function () {
       environment.beforeAll();
    });

    AfterAll(function () {
        environment.afterAll();
        return Promise.resolve()
    });

    Given('a broken connection to the database', function () {
      this.graph = new Grakn('http://0.1.2.3:3289');
    });

    Given(/a graph/, function () {
      const name = environment.newKeyspace().trim().replace(/(\r\n|\n|\r)/gm,"");
      this.graph = new Grakn('http://127.0.0.1:4567', name);
    });

    Given(/^(ontology|data) `(.*)`$/, function (type, patterns) {
       environment.insert(patterns);
     });
    
    When(/the user issues `(.*)`/, {timeout: 10 * 1000}, function (query, callback) {
        const context = this;
        this.graph.execute(query)
        .then(function(response){
            context.response = JSON.parse(response);
            callback();
        }).catch(function(error){
            context.error=error.message;
            callback();
        });        
    });
    
    Then('return an error', function () {
         expect(this.error).to.be.not.an('undefined');
    });
  
    Then(/^the response is `(.*)`$/, function (response) {
        const expected = (response==='True') ? true : ((response==='False') ? false : JSON.parse(response));
        expect(this.response).to.equal(expected);
    });

    Then(/^the response has (\d+|no) results?/, function(cardinality){
        const expected = (cardinality==='no') ? 0 : parseInt(cardinality);
        expect(this.response.length).to.equal(expected);
    });

    Then(/the type "(.*)" is in the graph/, function (label) {
        environment.checkType(label);
    });

    Then(/the instance with (.*) "(.*)" is in the graph/, function (resourceLabel, value) {
        environment.checkInstance(resourceLabel,value);
    });

    Then(/return a response with (new|existing) concepts/, function (type) {
        expect(this.response).to.be.not.empty;        
    });
    
    Then('the response is empty', function () {
        expect(this.response).to.equal(null);        
    });
  });
 
    
