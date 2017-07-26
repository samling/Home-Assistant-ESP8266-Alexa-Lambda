var Alexa = require('alexa-sdk');
const esp8266 = require('./esp8266');
esp8266.setup();

var handlers = {
    'HelloWorldIntent': function () {
        let displayText = "Test text";
        if (displayText) {
            let alexa = this
            let alexaEmit = function() {
                alexa.emit(':tell', 'Whatup, Sam!');
            }
            esp8266.displayText("Test text", alexaEmit);
        } else {
            this.emit(':tell', "Sorry, I couldn't figure this out");
        }
    }
};

exports.handler = function(event, context, callback) {
    let alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};
