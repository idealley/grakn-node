var Grakn = require('../../src/GraknClient');
var {defineSupportCode} = require('cucumber');
var expect = require('chai').expect;
var environment = require('../support/environment');

defineSupportCode(function({Given, When, Then, AfterAll, BeforeAll}) {
    BeforeAll(function () {
       environment.beforeAll();
    });

    AfterAll(function () {
        environment.afterAll();
        return Promise.resolve()
    });


    Given('a broken connection to the database', function () {
      this.graph = new Grakn('0.1.2.3:3289');
    });

    Given(/a graph/, function () {
      var name = environment.newKeyspace().trim().replace(/(\r\n|\n|\r)/gm,"");
      this.graph = new Grakn('127.0.0.1:4567', name);
    });

    Given(/^(ontology|data) `(.*)`$/, function (type, patterns) {
       environment.insert(patterns);
     });
    
    When(/the user issues `(.*)`/, {timeout: 10 * 1000}, function (query, callback) {
        var context = this;
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
        if(response==='True')response=true;
        else if(response==='False')response=false;
        else response=JSON.parse(response);
        expect(this.response).to.equal(response);
    });

    Then(/^the response has (\d+|no) results?/, function(cardinality){
        if(cardinality==='no'){
            expect(this.response.length).to.equal(0);
        }else{
            expect(this.response.length).to.equal(parseInt(cardinality));
        }
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
 
    
