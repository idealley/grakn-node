var Grakn = require('../../src/GraknClient');
var {defineSupportCode} = require('cucumber');
var expect = require('chai').expect;

defineSupportCode(function({Given, When, Then}) {
    Given('a broken connection to the database', function () {
      // Write code here that turns the phrase above into concrete actions
      this.graph = new Grakn('0.1.2.3:3289');
    });

    Given(/a graph/, function (callback) {
      // Write code here that turns the phrase above into concrete actions
      callback(null, 'pending');
    });

    Given(/^(ontology|data) `(.*)`$/, function (callback) {
       // Write code here that turns the phrase above into concrete actions
       callback(null, 'pending');
     });
    
    When(/the user issues `(.*)`/, function (query, callback) {
        var context = this;
        this.graph.execute(query)
        .then(function(response){
            context.response=response;
            callback();
        }).catch(function(error){
            context.error=error.message;
            callback();
        });
    });
    
    Then('return an error', function () {
         expect(this.error).to.be.not.an('undefined');
    });
  
    When('the user connects to the graph', function (callback) {
      // Write code here that turns the phrase above into concrete actions
      callback(null, 'pending');
    });

    Then('return a usable connection', function (callback) {
      // Write code here that turns the phrase above into concrete actions
      callback(null, 'pending');
    });

    Then(/^the response is (.*)$/, function (response, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback(null, 'pending');
    });

    Then(/^the response has (\d+|no) results?/, function(callback){
        callback(null, 'pending');        
    });

    Then('the type {string} is in the graph', function (string, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback(null, 'pending');
    });
    Then('the instance with name {string} is in the graph', function (string, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback(null, 'pending');
      });

      Then(/return a response with (new|existing) concepts/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback(null, 'pending');
      });
  });
 
    
