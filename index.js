var Alexa = require('alexa-sdk');
const util = require('util');
const esp8266 = require('./esp8266');
esp8266.setup();

var handlers = {
    'TurnOnIntent': function () {
        var intent = this.event.request.intent;
        let displayText = intent.slots.Device.value.toString();
        if (intent.slots.Device.resolutions.resolutionsPerAuthority != undefined) {
            let resolutions = intent.slots.Device.resolutions.resolutionsPerAuthority;
            let success_code = resolutions[0].status.code;
            if (success_code.toString().replace(/[']/g, "") == "ER_SUCCESS_MATCH") {
                let resolvedDeviceName = resolutions[0].values[0].value.name.toString();
                let alexa = this
                let alexaEmit = function() {
                    alexa.emit(':tell', 'As you wish.');
                }
                esp8266.displayText(resolvedDeviceName, 'ON', alexaEmit);
            } else {
                this.emit(':tell', "Sorry, I couldn't figure out which device you meant");
            }
        } else {
            console.log(util.inspect(intent.slots.Device, false, null));
        }
    },
    'TurnOffIntent': function () {
        var intent = this.event.request.intent;
        let displayText = intent.slots.Device.value.toString();
        if (intent.slots.Device.resolutions.resolutionsPerAuthority != undefined) {
            let resolutions = intent.slots.Device.resolutions.resolutionsPerAuthority;
            let success_code = resolutions[0].status.code;
            if (success_code.toString().replace(/[']/g, "") == "ER_SUCCESS_MATCH") {
                let resolvedDeviceName = resolutions[0].values[0].value.name.toString();
                let alexa = this
                let alexaEmit = function() {
                    alexa.emit(':tell', 'As you wish.');
                }
                esp8266.displayText(resolvedDeviceName, 'OFF', alexaEmit);
            } else {
                this.emit(':tell', "Sorry, I couldn't figure out which device you meant");
            }
        } else {
            console.log(util.inspect(intent.slots.Device, false, null));
        }
    },
    'SleepIntent': function () {
        let alexa = this
        let alexaEmit = function() {
            alexa.emit(':tell', 'Goodnight Sam.');
        }
        let emptyResponse = function(){};
        esp8266.displayText('desk', 'OFF', emptyResponse);
        esp8266.displayText('nightstand', 'OFF', emptyResponse);
        esp8266.displayText('other lamp', 'OFF', alexaEmit);
    },
    'LightsOnIntent': function () {
        let alexa = this
        let alexaEmit = function() {
            alexa.emit(':tell', 'Howdie doo Sam.');
        }
        let emptyResponse = function(){};
        esp8266.displayText('desk', 'ON', emptyResponse);
        esp8266.displayText('nightstand', 'ON', alexaEmit);
    }
};

exports.handler = function(event, context, callback) {
    let alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};
