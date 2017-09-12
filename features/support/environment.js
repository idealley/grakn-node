var { spawnSync } = require('child_process');
var { StringDecoder } = require('string_decoder');
var decoder = new StringDecoder('utf8');

var scriptPath = './features/grakn-spec/env.sh';

module.exports = {
    beforeAll: function(){
        var process = spawnSync(scriptPath, ['start','0.16.0'], {stdio:[0,1,2]});
        if(process.status!=0) {
            var err = Buffer.from(process.output[2]);            
            console.log('Failed to start test environment: '+decoder.write(err));
        }
    },
    afterAll: function(){
        var process = spawnSync(scriptPath, ['stop'], {stdio:[0,1,2]});
        if(process.status!=0){
            var err = Buffer.from(process.output[2]);                        
            console.log('Failed to stop test environment: '+decoder.write(err));
        }
        console.log('Beautifully stopped!');
    },
    newKeyspace: function(){
        var process = spawnSync(scriptPath, ['keyspace']);
        if(process.status!=0){
            var err = Buffer.from(process.output[2]);                        
            console.log('Failed to create new keyspace: '+decoder.write(err));
        }
        var keyspaceName = Buffer.from(process.stdout);
        return decoder.write(keyspaceName);
    },
    insert: function(patterns){
        var process = spawnSync(scriptPath, ['insert', patterns]);
        if(process.status!=0){
            var err = Buffer.from(process.output[2]);                        
            console.log('Failed to insert: '+decoder.write(err));
        }
    },
    checkType: function(label){
        var process = spawnSync(scriptPath, ['check', 'type', label]);
        if(process.status!=0){
            var err = Buffer.from(process.output[2]);                        
            console.log('Failed to check type: '+decoder.write(err));
        }
    },
    checkInstance: function(resourceLabel, value){
        var process = spawnSync(scriptPath, ['check', 'instance', resourceLabel, value]);
        if(process.status!=0){
            var err = Buffer.from(process.output[2]);                        
            console.log('Failed to check instance: '+decoder.write(err));
        }
    }
}