const restify = require('restify');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const { CloudAdapter, ConversationState, MemoryStorage, UserState, ConfigurationBotFrameworkAuthentication } = require('botbuilder');
const { DialogBot } = require('./dialogBot');
const { UserDialog } = require('./dialogs/userDialog');
const { XtraDialog } = require('./dialogs/XtraDialog');
const { ReplaceDialog } = require('./dialogs/replace_Dialog');

// Set up bot framework authentication
const botFrameworkAuthentication = new ConfigurationBotFrameworkAuthentication(process.env);

// Create adapter
const adapter = new CloudAdapter(botFrameworkAuthentication);

// Handle errors
adapter.onTurnError = async (context, error) => {
    console.error(`[onTurnError] unhandled error: ${error}`);
    console.error('Error details:', error.stack);

    await context.sendTraceActivity(
        'OnTurnError Trace',
        `${error}`,
        'https://www.botframework.com/schemas/error',
        'TurnError'
    );

    await context.sendActivity('The bot encountered an error or bug.');
    await context.sendActivity('To continue to run this bot, please fix the bot source code.');
};

// Create memory storage
const memoryStorage = new MemoryStorage();

// Create conversation and user state
const conversationState = new ConversationState(memoryStorage);
const userState = new UserState(memoryStorage);

// Create dialogs
const userDialog = new UserDialog();
const xtraDialog = new XtraDialog();
const Replacedialog = new ReplaceDialog();

// Create the bot
const bot = new DialogBot(conversationState, userState, userDialog, xtraDialog,Replacedialog);

// Create server
const server = restify.createServer();
server.use(restify.plugins.bodyParser());

// Set up server
server.listen(process.env.port || process.env.PORT || 3602, () => {
    console.log(`\n${server.name} listening to ${server.url}.`);
    console.log('\nGet Bot Framework Emulator: https://aka.ms/botframework-emulator');
    console.log('\nTo talk to your bot, open the emulator select "Open Bot"');
});

// Listen for incoming activities
server.post('/api/messages', async (req, res) => {
    await adapter.process(req, res, (context) => bot.run(context));
});
