# Lambda App for Alexa to IoT

## Description
This is a NodeJS application meant to be run in an AWS Lambda function in
order to issue MQTT messages to an IoT device in response to an Alexa voice
command.

There are quite a few prerequisites to this. Starting with hardware:

### Hardware
* Amazon Echo, Echo Dot, or some other Alexa device
* ESP8266-based microcontroller

### Software
* Internet browser
* AWS account

### Configuration
There is a wealth of information out there on how to get started with the Alexa
Skills Kit as well as how to use it with Lambda. Here's a rough list of steps to
get started:

1. Create an AWS IAM user and attach the AWSIoTFullAccess policy (or some subset of it)
2. Create an access key and note your ID and secret
3. Create an AWS IoT "Thing" that represents your device; this will also act as the MQTT broker
4. Create a `certs/` folder in this repository and save the generated certificates to it
5. Create a security policy for the Thing that gives it permissions to run AWS IoT API calls
6. Connect to your thing via MQTT and the AWS Arduino SDK (see [my ESP8266 code](https://github.com/samling/Home-Assistant-ESP8266) for an example; you will need the AWS access key you created earlier)
7. Create an AWS Lambda function that will be our handler for Alexa voice commands
8. Log into [https://developer.amazon.com](https://developer.amazon.com) and go to the Alexa tab
9. Select Alexa Skills Kit and configure a new skill
10. Under "Configuration", choose "AWS Lambda ARN" and supply the ARN of your Lambda skill
11. (Optional) Configure Account Linking for user info to be supplied to Alexa using your IAM ID and secret from earlier
12. Back in your Lambda function, set it up for this repo's code:

        Runtime: Node.js 6.10

        Handler: index.handler

        Role: Create a new role (if you don't have one) or Choose an existing role

        Existing role (if you have one): Your existing role

        Description: A description of this function

13. If you haven't configured a new role, create a new one and attach the AWSLambdaBasicExecutionRole policy to it
14. Add or verify that the Alexa Skills Kit is in the triggers
15. Add the certs created 
16. Zip the *contents* of this repository (not the folder itself); the `build.sh` script in this repository will create a zip file in the directory above this one
17. Under the "Code" tab, choose "Upload a .ZIP file" and upload the zip you just created
18. Test by either issuing a voice command like "Alexa, tell trigger\_name "Hello world" or by testing via the Alexa Skills Kit or Lambda test interfaces

You should see this response following a successful trigger:

```
{
  "version": "1.0",
  "response": {
    "shouldEndSession": true,
    "outputSpeech": {
      "type": "SSML",
      "ssml": "<speak> Hello world! </speak>"
    }
  },
  "sessionAttributes": {}
}
```

Or you will hear Alexa respond "Hello world!".

### Additional Reading
As mentioned, there is a wealth of reading available on configuring this chain. Here are
some links I've found useful:

* [joanaz/MirrorMirrorOnTheWallSkill](https://github.com/joanaz/MirrorMirrorOnTheWallSkill) - This guy goes right at the top for resolving how to send an IoT message as well as respond via voice
* [Using Alexa Skills Kit and AWS IoT to Voice Control Connected Devices](https://developer.amazon.com/blogs/post/Tx3828JHC7O9GZ9/Using-Alexa-Skills-Kit-and-AWS-IoT-to-Voice-Control-Connected-Devices)
* [Alexa Account Linking: 5 Steps to Seamlessly Link Your Alexa Skill with Login with Amazon](https://developer.amazon.com/blogs/post/Tx3CX1ETRZZ2NPC/Alexa-Account-Linking-5-Steps-to-Seamlessly-Link-Your-Alexa-Skill-with-Login-wit)
* [Arduino Using AWS IoT Service](http://www.instructables.com/id/Arduino-Using-AWS-IoT-Serivce/) - For an Ameba microcontroller, but the IoT setup steps are the same
* [Create an AWS Lambda Function for a Custom Skill](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/developing-an-alexa-skill-as-a-lambda-function)
* [aws/aws-iot-device-sdk-js](https://github.com/aws/aws-iot-device-sdk-js)
* [odelot/aws-mqtt-websockets](https://github.com/odelot/aws-mqtt-websockets) - Bit of a pain to set up but works flawlessly
* [alexa/alexa-skills-kit-sdk-for-nodejs](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs)
