const { ComponentDialog, TextPrompt, WaterfallDialog } = require('botbuilder-dialogs');

const REPLACE_DIALOG = 'REPLACE_DIALOG ';
const GOAL_PROMPT = 'GOAL_PROMPT';
const WATERFALL_DIALOG = 'WATERFALL_DIALOG';

class ReplaceDialog extends ComponentDialog {
    constructor() {
        super(REPLACE_DIALOG );

        this.addDialog(new TextPrompt(GOAL_PROMPT));
        

        this.addDialog(new WaterfallDialog(WATERFALL_DIALOG, [
            this.userChoiceStep.bind(this),
            this.receiveUserGoal.bind(this)
            
        ]));

        this.initialDialogId = WATERFALL_DIALOG;
    }

    async userChoiceStep(stepContext) {
        return await stepContext.prompt(GOAL_PROMPT, 'What is your goal?');

    }


    async receiveUserGoal(stepContext) {
        
        const userGoal = stepContext.result;
        await stepContext.context.sendActivity(`Your goal is: ${userGoal}`);
        return await stepContext.endDialog();
    }

}

ReplaceDialog.dialogId = REPLACE_DIALOG ;
module.exports.ReplaceDialog = ReplaceDialog;
