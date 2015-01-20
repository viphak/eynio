
module.exports = function(loglevel) {

    var bunyan = require('bunyan');
    var PrettyStream = require('bunyan-prettystream');
    
    var prettyStdOut = new PrettyStream({mode: 'short'});
    prettyStdOut.pipe(process.stdout);
    
    var ringbuffer = new bunyan.RingBuffer({ limit: 100 });
    
    var log = bunyan.createLogger({
        name: 'NHome',
        streams: [{
            level: loglevel,
            stream: prettyStdOut
        },{
            level: loglevel,
            type: 'raw',
            stream: ringbuffer
        }]
    });
    
    console.log = function() {
        log.warn.apply(log, arguments);   
    }

    return log;
};