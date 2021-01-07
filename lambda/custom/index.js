/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
// import .env config
require('dotenv/config');
// import intents from /intents/index.js
const { welcomeIntents } = require('./intents/index');
// instantiate dynamodb persistence adapter
const ddbAdapter = require('ask-sdk-dynamodb-persistence-adapter'); 
// import util
const util = require('./util');
// iniciate persistenceAdapter
const persistenceAdapter = util.getPersistenceAdapter();
// require welcome messages
const welcomeResponses = require('./responses/welcome');

const LoadAttributesRequestInterceptor = {
    async process(handlerInput) {
        const persistentAttributes = await handlerInput.attributesManager.getPersistentAttributes();

        // Check if user is invoking the skill the first time and initialize preset values
        if (persistentAttributes && !persistenceAdapter.firstAccess) {
            // User first access to skill
            handlerInput.attributesManager.setPersistentAttributes({
                firstAccess: true,
            });
        }
    }
};

// If you disable the skill and reenable it the userId might change and you loose the persistent attributes saved below as userId is the primary key
const SaveAttributesResponseInterceptor = {
    async process(handlerInput, response) {
        await handlerInput.attributesManager.savePersistentAttributes();
    }
};

/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = welcomeResponses.ERROR_MSG();
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        welcomeIntents.LaunchRequestHandler,
        welcomeIntents.HelloWorldIntentHandler,
        welcomeIntents.HelpIntentHandler,
        welcomeIntents.CancelAndStopIntentHandler,
        welcomeIntents.FallbackIntentHandler,
        welcomeIntents.SessionEndedRequestHandler)
    .addErrorHandlers(
        ErrorHandler)
    .addRequestInterceptors(
        LoadAttributesRequestInterceptor)
    .addResponseInterceptors(
        SaveAttributesResponseInterceptor)
    .withPersistenceAdapter(persistenceAdapter)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();
