if [ -f ../alexa-esp8266.zip ]; then
    rm ../alexa-esp8266.zip
fi
zip -r --exclude=*.git* ../alexa-esp8266.zip *
