'use strict';
var Alexa = require('alexa-sdk');

var APP_ID = 'amzn1.ask.skill.5eaf9810-5379-4ef5-93e9-b9e86aa5a765'; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";
var SKILL_NAME = 'SimHomeQA';

/**
 * Array containing space facts.
 */

var SpringSummerTips = [
    "USE YOUR WINDOWS TO GAIN COOL AIR AND KEEP OUT HEAT: If you live in a climate where it cools off at night, turn off your cooling system and open your windows while sleeping. When you wake in the morning, shut the windows and blinds to capture the cool air. ",
    "USE YOUR WINDOWS TO GAIN COOL AIR AND KEEP OUT HEAT: Install window coverings to prevent heat gain through your windows.",
    "OPERATE YOUR THERMOSTAT EFFICIENTLY: Set your thermostat as high as comfortably possible in the summer. The smaller the difference between the indoor and outdoor temperatures, the lower your overall cooling bill will be.", 
    "Keep your house warmer than normal when you are away, and lower the thermostat setting to 78°F (26°C) only when you are at home and need cooling. A programmable thermostat can make it easy to set back your temperature.",
    "Avoid setting your thermostat at a colder setting than normal when you turn on your air conditioner. It will not cool your home any faster and could result in excessive cooling and unnecessary expense.",
    "USE FANS AND VENTILATION STRATEGIES TO COOL YOUR HOME",
    "If you use air conditioning, a ceiling fan will allow you to raise the thermostat setting about 4°F with no reduction in comfort.",
    "Turn off ceiling fans when you leave the room. Remember that fans cool people, not rooms, by creating a wind chill effect.",
    "When you shower or take a bath, use the bathroom fan to remove the heat and humidity from your home. Your laundry room might also benefit from spot ventilation. Make sure bathroom and kitchen fans are vented to the outside (not just to the attic).",
    "KEEP YOUR COOLING SYSTEM RUNNING EFFICIENTLY: Schedule regular maintenance for your cooling equipment.",
    "Avoid placing lamps or TV sets near your room air-conditioning thermostat. The thermostat senses heat from these appliances, which can cause the air conditioner to run longer than necessary.",
    "Vacuum registers regularly to remove any dust buildup. Ensure that furniture and other objects are not blocking the airflow through your registers.",
    "DON'T HEAT YOUR HOME WITH APPLIANCES AND LIGHTING: Install efficient lighting that runs cooler. Only about 10% to 15% of the electricity that incandescent lights consume results in light—the rest is turned into heat.",
    "On hot days, avoid using the oven; cook on the stove, use a microwave oven, or grill outside.",
    "Take advantage of daylight instead of artificial lighting, but avoid direct sunlight.",
    "Wash only full loads of dishes and clothes. Consider air drying both dishes and clothing.",
];
var FallWinterTips = [
    "Take advantage of daylight instead of artificial lighting.",
    "Wash only full loads of dishes and clothes. Consider air drying both dishes and clothing.",
];
var FACTS = [
    "A year on Mercury is just 88 days long.",
    "Despite being farther from the Sun, Venus experiences higher temperatures than Mercury.",
    "Venus rotates counter-clockwise, possibly because of a collision in the past with an asteroid.",
    "On Mars, the Sun appears about half the size as it does on Earth.",
    "Earth is the only planet not named after a god.",
    "Jupiter has the shortest day of all the planets.",
    "The Milky Way galaxy will collide with the Andromeda Galaxy in about 5 billion years.",
    "The Sun contains 99.86% of the mass in the Solar System.",
    "The Sun is an almost perfect sphere.",
    "A total solar eclipse can happen once every 1 to 2 years. This makes them a rare event.",
    "Saturn radiates two and a half times more energy into space than it receives from the sun.",
    "The temperature inside the Sun can reach 15 million degrees Celsius.",
    "The Moon is moving approximately 3.8 cm away from our planet every year."
];

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('HELLO'); //emit another intent
    },
    'GetAnswer': function () {
        this.emit('GetEnergySavingTips');
    },
    'GetEnergySavingTips': function () {
        // Get a random space fact from the space facts list
        var d = new Date();
        var mo = d.getMonth();
        var randomFact = "";
        var season = "";
        if(d<9 && d>4){
            var factIndex = Math.floor(Math.random() * SpringSummerTips.length);
            randomFact = SpringSummerTips[factIndex];
            season = "spring and summer."
        }else{
            var factIndex = Math.floor(Math.random() * FallWinterTips.length);
            randomFact = FallWinterTips[factIndex];
            season = "fall and winter."
        }

        // Create speech output
        var speechOutput = "Here's a energy saving tip for " + season + randomFact;

        this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact)
    },
    'HELLO': function () {
        var speechOutput = "Hi There! My name is Emma, the energy monitor and management assisant. Nice to meet  you. How can I help you answer any questions?";
        var promptSpeech = "Are you still there? How can I help you answer any questions?"
        var cardTitle = 'Open Sim Home Card';
        var cardContent = 'This text will be displayed in the companion app card.';

        this.emit(':askWithCard', speechOutput,promptSpeech, cardTitle, cardContent ,SKILL_NAME)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = "You can say tell me a energy saving tip, or, you can say exit... What can I help you with?";
        var reprompt = "What can I help you with?";
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Goodbye!');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Goodbye!');
    }
};