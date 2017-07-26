var awsIot = require('aws-iot-device-sdk')

var app = {}

app.setup = function() {
    app.device = awsIot.device({
        keyPath: './certs/esp8266.private.key',
        certPath: './certs/esp8266.cert.pem',
        caPath: './certs/root-CA.crt',
        clientId: 'Alexa-ESP8266' + (new Date().getTime()),
        region: 'us-east-1',
        host: 'a2ae0lf6k1fc69.iot.us-east-1.amazonaws.com',
        debug: true
    });

    app.device.on('connect', function() {
        console.log('Connected');
    });

    app.device.on('message', function(topic, payload) {
        console.log('message', topic, payload.toString());
    });
}

app.displayText = function(text, callback) {
    var update = {
        "displayText": text
    };

    app.device.publish("$aws/things/esp8266/shadow/update", JSON.stringify(update), function() {
        console.log("Published: \nTopic => " + "$aws/things/esp8266/shadow/update" + "Data =>" + JSON.stringify(update));
        callback();
    });
}

module.exports = app
