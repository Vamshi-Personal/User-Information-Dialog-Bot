// const { DialogSet, DialogTurnStatus, ChoicePrompt, TextPrompt, WaterfallDialog, Dialog } = require('botbuilder-dialogs');
// const { UserDialog } = require('./dialogs/userDialog');
// const { XtraDialog } = require('./dialogs/XtraDialog');
// const { ActivityHandler, CardFactory } = require('botbuilder');
// const fs = require('fs');
// const path = require('path');

// const MAIN_DIALOG = 'MAIN_DIALOG';
// const CHOICE_PROMPT = 'CHOICE_PROMPT';
// const TEXT_PROMPT = 'TEXT_PROMPT';

// class DialogBot extends ActivityHandler {
//     constructor(conversationState) {
//         super();

//         this.conversationState = conversationState;
//         this.dialogState = this.conversationState.createProperty('dialogState');
//         this.dialogs = new DialogSet(this.dialogState);

//         // Register dialogs
//         this.dialogs.add(new ChoicePrompt(CHOICE_PROMPT));
//         this.dialogs.add(new TextPrompt(TEXT_PROMPT));
//         this.dialogs.add(new UserDialog());
//         this.dialogs.add(new XtraDialog());

//         // Main dialog
//         this.dialogs.add(new WaterfallDialog(MAIN_DIALOG, [
//             this.greetingMessage.bind(this),
//             this.promptForUse.bind(this),
//             this.chooseDialog.bind(this),
//             this.handleChoice.bind(this)
//         ]));

//         this.onMessage(async (context, next) => {
//             const dialogContext = await this.dialogs.createContext(context);
//             const results = await dialogContext.continueDialog();

//             if (results.status === DialogTurnStatus.empty) {
//                 await dialogContext.beginDialog(MAIN_DIALOG);
//             }

//             await next();
//         });

//         this.onDialog(async (context, next) => {
//             await this.conversationState.saveChanges(context, false);
//             await next();
//         });
//     }

//     async greetingMessage(step) {
//         await step.context.sendActivity('Hello! How can I assist you today?');
//         return await step.prompt(TEXT_PROMPT, 'Please reply with anything to continue.');
//     }

//     async promptForUse(step) {
//         await step.context.sendActivity('This bot can help you with user information and favorite info. Please choose an option below.');
//         return await step.next();
//     }

//     async chooseDialog(step) {
//         const cardPath = path.join(__dirname, './cards/dialogChoiceCard.json');
//         const cardTemplate = JSON.parse(fs.readFileSync(cardPath, 'utf8'));

//         await step.context.sendActivity({
//             attachments: [CardFactory.adaptiveCard(cardTemplate)]
//         });

//         return Dialog.EndOfTurn; 
//     }

//     async handleChoice(step) {
//         const choice = step.context.activity.value?.choice || '';
//         if (choice === 'User Info') {
//             return await step.beginDialog(UserDialog.dialogId);
//         } else if (choice === 'Favorite Info') {
//             return await step.beginDialog(XtraDialog.dialogId);
//         } else {
//             await step.context.sendActivity('Invalid choice, please choose again.');
//             return await step.replaceDialog(MAIN_DIALOG);
//         }
//     }
// }

// module.exports.DialogBot = DialogBot;


const { DialogSet, DialogTurnStatus, ChoicePrompt, TextPrompt, WaterfallDialog, Dialog } = require('botbuilder-dialogs');
const { UserDialog } = require('./dialogs/userDialog');
const { XtraDialog } = require('./dialogs/XtraDialog');
const {ReplaceDialog } = require('./dialogs/replace_Dialog');
const { ActivityHandler, CardFactory } = require('botbuilder');
const fs = require('fs');
const path = require('path');

const MAIN_DIALOG = 'MAIN_DIALOG';
const CHOICE_PROMPT = 'CHOICE_PROMPT';
const TEXT_PROMPT = 'TEXT_PROMPT';


class DialogBot extends ActivityHandler {
    constructor(conversationState) {
        super();

        this.conversationState = conversationState;
        this.dialogState = this.conversationState.createProperty('dialogState');
        this.dialogs = new DialogSet(this.dialogState);

        // Register dialogs
        this.dialogs.add(new ChoicePrompt(CHOICE_PROMPT));
        this.dialogs.add(new TextPrompt(TEXT_PROMPT));
        this.dialogs.add(new UserDialog());
        this.dialogs.add(new XtraDialog());
        this.dialogs.add(new ReplaceDialog());

        // Main dialog
        this.dialogs.add(new WaterfallDialog(MAIN_DIALOG, [
            this.greetingMessage.bind(this),
            this.promptForUse.bind(this),
            this.chooseDialog.bind(this),
            this.handleChoice.bind(this)
        ]));

        this.onMessage(async (context, next) => {
            const dialogContext = await this.dialogs.createContext(context);
            const results = await dialogContext.continueDialog();

            if (results.status === DialogTurnStatus.empty) {
                await dialogContext.beginDialog(MAIN_DIALOG);
            }

            await next();
        });

        this.onDialog(async (context, next) => {
            await this.conversationState.saveChanges(context, false);
            await next();
        });
    }

    async greetingMessage(stepContext) {
        await stepContext.context.sendActivity('Hello! How can I assist you today?');
        return await stepContext.prompt(TEXT_PROMPT, 'Please reply with anything to continue.');
    }

    async promptForUse(stepContext) {
        await stepContext.context.sendActivity('This bot can help you with user information and favorite info. Please choose an option below.');
        return await stepContext.next();
    }

    async chooseDialog(stepContext) {
        const cardPath = path.join(__dirname, './cards/dialogChoiceCard.json');
        const cardTemplate = JSON.parse(fs.readFileSync(cardPath, 'utf8'));

        await stepContext.context.sendActivity({
            attachments: [CardFactory.adaptiveCard(cardTemplate)]
        });

        return Dialog.EndOfTurn; 
    }

    async handleChoice(stepContext) {
        const choice = stepContext.context.activity.value?.choice || '';
        if (choice === 'User Info') {
            return await stepContext.beginDialog(UserDialog.dialogId);
        } else if (choice === 'Favorite Info') {
            return await stepContext.beginDialog(XtraDialog.dialogId);
        } else {
            await stepContext.context.sendActivity('What else can I do for you?');
            return await stepContext.replaceDialog(ReplaceDialog.dialogId);
                
            // await stepContext.context.sendActivity('Invalid choice, please choose again.');
            // return await stepContext.replaceDialog(ReplaceDialog.dialogId, {
            //     restartMsg : 'What else can I do for you?',
            //     flag: true,
            //     listen : stepContext.context.activity.text
            

            

        }
    }
}

module.exports.DialogBot = DialogBot;

