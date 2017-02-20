var restify = require('restify');
var builder = require('botbuilder');

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

//=========================================================
// Bots Dialogs
//=========================================================
var intents = new builder.IntentDialog();

var sentences = [
   'Gyul u have meh missing yuh like a blind man pelting mango.',
   'Eh famaly hear meh na. I wha sort yuh out like a bag a lentil peas.',
   'Gyul yuh have more form dan a secondary school',
   'You is de dhal in my dhalpourie, without you, I sada',
   'Ah hope yuh come wit ah library card cuz ah checkin yuh out',
   'Yuh fadda does cut cane? How yuh sweet so?',
   'Is your name wi fi....... Cause I definitely feeling a connection',
   'My name is Three Plumes, I is the best match for you',
   'Ay gyul if I was tuh get ah dollar fuh every time ah tink bout yuh ah go only have one cuz u never leaving my mind',
   'Gyul yuh is d X in me CRIX.  Without you I just CRI',
   'Gyul, yuh working republic bank or wah?? Cuz you are the one for me',
];


maxSentences = sentences.length;

function getRandomSentence() {
    var index = Math.floor(Math.random() * (maxSentences - 1));
    return sentences[index];
}

bot.dialog('/', intents);

intents.matches(/^pickup/i, [
    function (session, results) {
        session.send(getRandomSentence());
    }
]);

intents.onDefault([
    function (session, results) {
      session.send("Welcome to Trini Pickup lines. You want to pickup a Trini ? Just type 'pickup' ");
    }
]);
