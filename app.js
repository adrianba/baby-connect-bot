require('dotenv-extended').load();
var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

// Respond to unknown messages
var bot = new builder.UniversalBot(connector, function (session) {
    session.send("Sorry, I didn't understand what you said: %s.",session.message.text);
});

// Attach LUIS model
var recognizer = new builder.LuisRecognizer(process.env.LUIS_MODEL_URL);
bot.recognizer(recognizer);

bot.dialog('SleepStatus', function (session,args) {
    console.log(JSON.stringify(args,2));



    session.endDialog("Hi - I wish I could tell you about sleep status!");
}).triggerAction({
    matches:'SleepStatus'
});
