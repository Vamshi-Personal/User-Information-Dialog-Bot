const { ComponentDialog, TextPrompt, WaterfallDialog, Dialog } = require('botbuilder-dialogs');
const { CardFactory } = require('botbuilder');
const fs = require('fs');
const path = require('path');

const XTRA_DIALOG = 'XTRA_DIALOG';
const COLOR_PROMPT = 'COLOR_PROMPT';
const ANIMAL_PROMPT = 'ANIMAL_PROMPT';
const SPORT_PROMPT = 'SPORT_PROMPT';
const WATERFALL_DIALOG = 'WATERFALL_DIALOG';

class XtraDialog extends ComponentDialog {
    constructor() {
        super(XTRA_DIALOG);

        this.addDialog(new TextPrompt(COLOR_PROMPT));
        this.addDialog(new TextPrompt(ANIMAL_PROMPT));
        this.addDialog(new TextPrompt(SPORT_PROMPT));

        this.addDialog(new WaterfallDialog(WATERFALL_DIALOG, [
            this.askForColor.bind(this),
            this.askForAnimal.bind(this),
            this.askForSport.bind(this),
            this.showFavoriteInfo.bind(this)
        ]));

        this.initialDialogId = WATERFALL_DIALOG;
    }

    async askForColor(stepContext) {
        const cardPath = path.join(__dirname, '../cards/colorPromptCard.json');
        const cardTemplate = JSON.parse(fs.readFileSync(cardPath, 'utf8'));

        await stepContext.context.sendActivity({
            attachments: [CardFactory.adaptiveCard(cardTemplate)]
        });

        return Dialog.EndOfTurn;
    }

    async askForAnimal(stepContext) {
        stepContext.values.color = stepContext.context.activity.value?.favoriteColor || 'Not provided';

        const cardPath = path.join(__dirname, '../cards/animalPromptCard.json');
        const cardTemplate = JSON.parse(fs.readFileSync(cardPath, 'utf8'));

        await stepContext.context.sendActivity({
            attachments: [CardFactory.adaptiveCard(cardTemplate)]
        });

        return Dialog.EndOfTurn;
    }

    async askForSport(stepContext) {
        stepContext.values.animal = stepContext.context.activity.value?.favoriteAnimal || 'Not provided';

        const cardPath = path.join(__dirname, '../cards/sportPromptCard.json');
        const cardTemplate = JSON.parse(fs.readFileSync(cardPath, 'utf8'));

        await stepContext.context.sendActivity({
            attachments: [CardFactory.adaptiveCard(cardTemplate)]
        });

        return Dialog.EndOfTurn;
    }

    async showFavoriteInfo(stepContext) {
        stepContext.values.sport = stepContext.context.activity.value?.favoriteSport || 'Not provided';

        const { color, animal, sport } = stepContext.values;

        const summaryCard = {
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "type": "AdaptiveCard",
            "version": "1.2",
            "body": [
                {
                    "type": "TextBlock",
                    "text": "Here are the Information you provided:"
                },
                {
                    "type": "TextBlock",
                    "text": `Favorite Color: ${color}`,
                    "wrap": true
                },
                {
                    "type": "TextBlock",
                    "text": `Favorite Animal: ${animal}`,
                    "wrap": true
                },
                {
                    "type": "TextBlock",
                    "text": `Favorite Sport: ${sport}`,
                    "wrap": true
                }
            ]
        };

        await stepContext.context.sendActivity({
            attachments: [CardFactory.adaptiveCard(summaryCard)]
        });

        return await stepContext.endDialog();
    }
}

XtraDialog.dialogId = XTRA_DIALOG;
module.exports.XtraDialog = XtraDialog;
