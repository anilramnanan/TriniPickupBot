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

var intents = new builder.IntentDialog();

var pickupLines = [
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

var isaTriniLines = [
  'Yuh refer to all salt crackers as "Crix"',
  'Yuh know the meaning of the word "obzokie"',
  'Yuh own a cutlass',
  'Yuh know how to "scootch" somebody',
  'Yuh can name 3 types of mangoes',
  'Yuh call everybody "dread"',
  'Yuh know dat to "cuff" and "box" are fightin adjectives',
  'Yuh call every bee, wasp, or hornet a "jaxspaniard"',
  'Yuh pronounce San Juan: "Sah-Wah"',
  'Yuh tired of hearin "Who let da dogs out?" cause yuh know de original by Anslem is de REAL thing',
  'Old dub like "Ram-Ram" brings back some special memories',
  'When yuh crossing de road, and cars speeding toward yuh, yuh does say "Well bounce meh nah!"',
  'Yuh don\'t look at traffic lights when crossing de road',
  'Yuh does say, "Ah tell yuh!", even when someone else is telling you the story',
  'Yuh put salt on every citrus fruit yuh eat to make it sweeter',
  'Yuh can avoid potholes with true skills',
  'Yuh grow up on Klim, Milo, Horlicks or Ovaltine',
  'Speaking of that, yuh remember eating Ovaltinees, Smarties, Catch bars and Cheers candy?',
  'Every carbonated beverage is called a "sweet drink"',
  'A good lime is not edible',
  '"Donkey years" means a very long time',
  'Yuh clap with everybody else when de BWEE plane finally land in Port of Spain',
  'Yuh know what coki-eye is',
  'Yuh call it a car park instead of parking lot',
  'Yuh call chewing gum "tring gum"',
  'Yuh always seem to meet someone yuh knew in secondary school or dey cousin went to school with you',
  'De bone taste jus as good as de meat',
  'Yuh go to parties for the food... and the word free never quite had the same meaning',
  'Yuh nod your head upwards to greet someone.. and sideways when the joke stale'
];

var triniJokes = [
  'Yuh refer to all salt crackers as "Crix"'
];

var triniJokes = [
  'This trini man was arrested for whining on a dustbin.The Judge asked him "why were you whining on a dustbin?" He said "the sign on the dustbin marked throw waste here."',
  'A woman is driving up a one way street, so a police officer stops her and says: "Madam, do you know that this is a one way street?" The woman replies: "But officer, is only one way I am going!"',
  'a kethcup and a mustard fighting.. d ketchup hit him "SWISS" d mustard hit him "Mattoux"',
  'Where in Trinidad and Tobago are the best singers? In La Brea ... They have the best PITCH!',
  'Four Friends - Tambran, Ice, Curry, & Currants walking down the road when dey hear a gun shot, BODOOOW!!! Currants roll, Ice scream, Curry Duck and Tambran bawl...'
];


maxPickupLines = pickupLines.length;
maxTriniLines = isaTriniLines.length;
maxTriniJokes = triniJokes.length;

function getRandomPickupLine() {
    var index = Math.floor(Math.random() * (maxPickupLines - 1));
    return pickupLines[index];
}

function getRandomTriniLine() {
    var index = Math.floor(Math.random() * (maxTriniLines - 1));
    return isaTriniLines[index];
}

function getRandomTriniJoke() {
    var index = Math.floor(Math.random() * (maxTriniJokes - 1));
    return triniJokes[index];
}

bot.dialog('/', intents);

intents.matches(/^pickup/i, [
    function (session, results) {
        session.send(getRandomPickupLine());
    }
]);

intents.matches(/^joke/i, [
    function (session, results) {
        session.send(getRandomTriniJoke());
    }
]);


intents.matches(/^ah trini/i, [
    function (session, results) {
        session.send("You might be a Trini if..");
        session.send(getRandomTriniLine());
    }
]);

intents.onDefault([
    function (session, results) {
      session.send("Welcome to the Trini Joke bot. Type 'joke' for a good Trini joke or type 'pickup' for a Trini pickup line. If you want to know what makes a \"Trini\", type 'ah trini'");
    }
]);
