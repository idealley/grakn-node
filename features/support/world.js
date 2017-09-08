var {defineSupportCode} = require('cucumber');

function CustomWorld() {
  this.graph;
  this.response;
  this.error;
}

defineSupportCode(function({setWorldConstructor}) {
  setWorldConstructor(CustomWorld)
})