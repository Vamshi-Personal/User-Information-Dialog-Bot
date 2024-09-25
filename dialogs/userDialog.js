/* const { ComponentDialog, TextPrompt, ChoicePrompt, WaterfallDialog, Dialog, NumberPrompt } = require('botbuilder-dialogs');
const { CardFactory } = require('botbuilder');
const fs = require('fs');
const path = require('path');

const USER_DIALOG = 'USER_DIALOG';
const NAME_PROMPT = 'NAME_PROMPT';
const CHOICE_PROMPT = 'CHOICE_PROMPT';
const STATE_PROMPT = 'STATE_PROMPT';
//const USER_DETAILS = 'USER_DETAILS';
const DISTRICT_PROMPT = 'DISTRICT_PROMPT';
const WATERFALL_DIALOG = 'WATERFALL_DIALOG';

class UserDialog extends ComponentDialog {
    constructor() {
        super(USER_DIALOG);

        //this.userDetails = userState.createProperty(USER_DETAILS);

        this.addDialog(new TextPrompt(NAME_PROMPT));
        this.addDialog(new ChoicePrompt(CHOICE_PROMPT));
        this.addDialog(new TextPrompt(STATE_PROMPT));
        this.addDialog(new TextPrompt(DISTRICT_PROMPT));
        this.addDialog(new NumberPrompt(NUMBER_PROMPT));
        this.addDialog(new TextPrompt(QUALIFICATION_PROMPT));
        this.addDialog(new C)


        this.addDialog(new WaterfallDialog(WATERFALL_DIALOG, [
            this.askForName.bind(this),
            this.askForAge.bind(this),
            this.askForQualification.bind(this),
            this.askIfWorking.bind(this),
            this.handleWorkingStatusResponse.bind(this),
            this.askForSalary.bind(this),
            this.askForCountry.bind(this),
            this.askForState.bind(this),
            this.askForDistrict.bind(this),
            this.showSummary.bind(this)
        ]));

        this.initialDialogId = WATERFALL_DIALOG;
    }

    async askForName(step) {
        const cardPath = path.join(__dirname, '../cards/namePromptCard.json');
        const cardTemplate = JSON.parse(fs.readFileSync(cardPath, 'utf8'));

        await step.context.sendActivity({
            attachments: [CardFactory.adaptiveCard(cardTemplate)]
        });

        return Dialog.EndOfTurn;
    }

    async askForCountry(step) {
        const name = step.context.activity.value?.name || 'Not provided';
        step.values.name = name;

        const cardPath = path.join(__dirname, '../cards/countryPromptCard.json');
        const cardTemplate = JSON.parse(fs.readFileSync(cardPath, 'utf8'));

        await step.context.sendActivity({
            attachments: [CardFactory.adaptiveCard(cardTemplate)]
        });

        return Dialog.EndOfTurn;
    }

    async askForState(step) {
        const country = step.context.activity.value?.country || 'Not provided';
        step.values.country = country;

        const cardPath = path.join(__dirname, '../cards/statePromptCard.json');
        const cardTemplate = JSON.parse(fs.readFileSync(cardPath, 'utf8'));

        await step.context.sendActivity({
            attachments: [CardFactory.adaptiveCard(cardTemplate)]
        });

        return Dialog.EndOfTurn;
    }

    async askForDistrict(step) {
        const state = step.context.activity.value?.state || 'Not provided';
        step.values.state = state;

        const cardPath = path.join(__dirname, '../cards/districtPromptCard.json');
        const cardTemplate = JSON.parse(fs.readFileSync(cardPath, 'utf8'));

        await step.context.sendActivity({
            attachments: [CardFactory.adaptiveCard(cardTemplate)]
        });

        return Dialog.EndOfTurn;
    }

    async showSummary(step) {
        const district = step.context.activity.value?.district || 'Not provided';
        step.values.district = district;

        const { name, country, state } = step.values;

        const summaryCard = {
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "type": "AdaptiveCard",
            "version": "1.2",
            "body": [
                {
                    "type": "TextBlock",
                    "text": `Name: ${name}`,
                    "wrap": true
                },
                {
                    "type": "TextBlock",
                    "text": `Country: ${country}`,
                    "wrap": true
                },
                {
                    "type": "TextBlock",
                    "text": `State: ${state}`,
                    "wrap": true
                },
                {
                    "type": "TextBlock",
                    "text": `District: ${district}`,
                    "wrap": true
                }
            ]
        };

        await step.context.sendActivity({
            attachments: [CardFactory.adaptiveCard(summaryCard)]
        });

        return await step.endDialog();
    }
}

UserDialog.dialogId = USER_DIALOG;
module.exports.UserDialog = UserDialog;
 */



/* const { ComponentDialog, TextPrompt, ChoicePrompt, WaterfallDialog, Dialog, NumberPrompt } = require('botbuilder-dialogs');
const { CardFactory } = require('botbuilder');
const fs = require('fs');
const path = require('path');
 */
/* const USER_DIALOG = 'USER_DIALOG';
const NAME_PROMPT = 'NAME_PROMPT';
const CHOICE_PROMPT = 'CHOICE_PROMPT';
const STATE_PROMPT = 'STATE_PROMPT';
const DISTRICT_PROMPT = 'DISTRICT_PROMPT';
const AGE_PROMPT = 'AGE_PROMPT';
const QUALIFICATION_PROMPT = 'QUALIFICATION_PROMPT';
const WORKING_STATUS_PROMPT = 'WORKING_STATUS_PROMPT';
const SALARY_PROMPT = 'SALARY_PROMPT';
const WATERFALL_DIALOG = 'WATERFALL_DIALOG';

class UserDialog extends ComponentDialog {
    constructor() {
        super(USER_DIALOG);

        this.addDialog(new TextPrompt(NAME_PROMPT));
        this.addDialog(new ChoicePrompt(CHOICE_PROMPT));
        this.addDialog(new TextPrompt(STATE_PROMPT));
        this.addDialog(new TextPrompt(DISTRICT_PROMPT));
        this.addDialog(new NumberPrompt(AGE_PROMPT));
        this.addDialog(new TextPrompt(QUALIFICATION_PROMPT));
        this.addDialog(new ChoicePrompt(WORKING_STATUS_PROMPT));
        this.addDialog(new NumberPrompt(SALARY_PROMPT));

        this.addDialog(new WaterfallDialog(WATERFALL_DIALOG, [
            this.askForName.bind(this),
            this.askForAge.bind(this),
            this.askForQualification.bind(this),
            this.askIfWorking.bind(this),
            this.handleWorkingStatusResponse.bind(this),
            this.askForCountry.bind(this),
            this.askForState.bind(this),
            this.askForDistrict.bind(this),
            this.showSummary.bind(this)
        ]));

        this.initialDialogId = WATERFALL_DIALOG;
    }

    async askForName(step) {
        const cardPath = path.join(__dirname, '../cards/namePromptCard.json');
        const cardTemplate = JSON.parse(fs.readFileSync(cardPath, 'utf8'));

        await step.context.sendActivity({
            attachments: [CardFactory.adaptiveCard(cardTemplate)]
        });

        return Dialog.EndOfTurn;
    }

    async askForAge(step) {
        const name = step.context.activity.value?.name || 'Not provided';
        step.values.name = name;

        const cardPath = path.join(__dirname, '../cards/agePromptCard.json');
        const cardTemplate = JSON.parse(fs.readFileSync(cardPath, 'utf8'));

        await step.context.sendActivity({
            attachments: [CardFactory.adaptiveCard(cardTemplate)]
        });

        return Dialog.EndOfTurn;
    }

    async askForQualification(step) {
        const age = step.context.activity.value?.age || 'Not provided';
        step.values.age = age;

        const cardPath = path.join(__dirname, '../cards/qualificationPromptCard.json');
        const cardTemplate = JSON.parse(fs.readFileSync(cardPath, 'utf8'));

        await step.context.sendActivity({
            attachments: [CardFactory.adaptiveCard(cardTemplate)]
        });

        return Dialog.EndOfTurn;
    }

    async askIfWorking(step) {
        const qualification = step.context.activity.value?.qualification || 'Not provided';
        step.values.qualification = qualification;

        const cardPath = path.join(__dirname, '../cards/workingStatusPromptCard.json');
        const cardTemplate = JSON.parse(fs.readFileSync(cardPath, 'utf8'));

        await step.context.sendActivity({
            attachments: [CardFactory.adaptiveCard(cardTemplate)]
        });

        return Dialog.EndOfTurn;
    }

    async handleWorkingStatusResponse(step) {
        const workingStatus = step.context.activity.value?.workingStatus || 'Not provided';
        step.values.workingStatus = workingStatus;

        if (workingStatus === 'Yes') {
            return this.askForSalary(step);
        } else {
            // If not working, skip the salary prompt and go directly to asking for country
            return this.askForCountry(step);
        }
    }

    async askForSalary(step) {
        const cardPath = path.join(__dirname, '../cards/salaryPromptCard.json');
        const cardTemplate = JSON.parse(fs.readFileSync(cardPath, 'utf8'));

        await step.context.sendActivity({
            attachments: [CardFactory.adaptiveCard(cardTemplate)]
        });

        return Dialog.EndOfTurn;
    }

    async askForCountry(step) {
        const salary = step.context.activity.value?.salary || 'Not provided';
        step.values.salary = salary;

        if (!step.values.country) {
            const cardPath = path.join(__dirname, '../cards/countryPromptCard.json');
            const cardTemplate = JSON.parse(fs.readFileSync(cardPath, 'utf8'));

            await step.context.sendActivity({
                attachments: [CardFactory.adaptiveCard(cardTemplate)]
            });

            return Dialog.EndOfTurn;
        } else {
            // If country already provided, go directly to asking for state
            return this.askForState(step);
        }
    }

    async askForState(step) {
        const country = step.context.activity.value?.country || 'Not provided';
        step.values.country = country;

        const cardPath = path.join(__dirname, '../cards/statePromptCard.json');
        const cardTemplate = JSON.parse(fs.readFileSync(cardPath, 'utf8'));

        await step.context.sendActivity({
            attachments: [CardFactory.adaptiveCard(cardTemplate)]
        });

        return Dialog.EndOfTurn;
    }

    async askForDistrict(step) {
        const state = step.context.activity.value?.state || 'Not provided';
        step.values.state = state;

        const cardPath = path.join(__dirname, '../cards/districtPromptCard.json');
        const cardTemplate = JSON.parse(fs.readFileSync(cardPath, 'utf8'));

        await step.context.sendActivity({
            attachments: [CardFactory.adaptiveCard(cardTemplate)]
        });

        return Dialog.EndOfTurn;
    }

    async showSummary(step) {
        const district = step.context.activity.value?.district || 'Not provided';
        step.values.district = district;

        const { name, age, qualification, workingStatus, salary, country, state } = step.values;

        const summaryCard = {
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "type": "AdaptiveCard",
            "version": "1.2",
            "body": [
                {
                    "type": "TextBlock",
                    "text": `Name: ${name}`,
                    "wrap": true
                },
                {
                    "type": "TextBlock",
                    "text": `Age: ${age}`,
                    "wrap": true
                },
                {
                    "type": "TextBlock",
                    "text": `Qualification: ${qualification}`,
                    "wrap": true
                },
                {
                    "type": "TextBlock",
                    "text": `Working Status: ${workingStatus}`,
                    "wrap": true
                },
                {
                    "type": "TextBlock",
                    "text": `Salary: ${salary || 'Not provided'}`,
                    "wrap": true
                },
                {
                    "type": "TextBlock",
                    "text": `Country: ${country}`,
                    "wrap": true
                },
                {
                    "type": "TextBlock",
                    "text": `State: ${state}`,
                    "wrap": true
                },
                {
                    "type": "TextBlock",
                    "text": `District: ${district}`,
                    "wrap": true
                }
            ]
        };

        await step.context.sendActivity({
            attachments: [CardFactory.adaptiveCard(summaryCard)]
        });

        return await step.endDialog();
    }
}

UserDialog.dialogId = USER_DIALOG;
module.exports.UserDialog = UserDialog;
 */




// const { ComponentDialog, TextPrompt, ChoicePrompt, WaterfallDialog, Dialog, NumberPrompt } = require('botbuilder-dialogs');
// const { CardFactory } = require('botbuilder');
// const fs = require('fs');
// const path = require('path');

// // Dialog IDs
// const USER_DIALOG = 'USER_DIALOG';
// const NAME_PROMPT = 'NAME_PROMPT';
// const CHOICE_PROMPT = 'CHOICE_PROMPT';
// const STATE_PROMPT = 'STATE_PROMPT';
// const DISTRICT_PROMPT = 'DISTRICT_PROMPT';
// const AGE_PROMPT = 'AGE_PROMPT';
// const QUALIFICATION_PROMPT = 'QUALIFICATION_PROMPT';
// const WORKING_STATUS_PROMPT = 'WORKING_STATUS_PROMPT';
// const SALARY_PROMPT = 'SALARY_PROMPT';
// const WATERFALL_DIALOG = 'WATERFALL_DIALOG';

// class UserDialog extends ComponentDialog {
//     constructor() {
//         super(USER_DIALOG);

//         this.addDialog(new TextPrompt(NAME_PROMPT));
//         this.addDialog(new NumberPrompt(AGE_PROMPT));
//         this.addDialog(new TextPrompt(QUALIFICATION_PROMPT));
//         this.addDialog(new ChoicePrompt(WORKING_STATUS_PROMPT));
//         this.addDialog(new NumberPrompt(SALARY_PROMPT));
//         this.addDialog(new TextPrompt(STATE_PROMPT));
//         this.addDialog(new TextPrompt(DISTRICT_PROMPT));

//         this.addDialog(new WaterfallDialog(WATERFALL_DIALOG, [
//             this.askForName.bind(this),
//             this.askForAge.bind(this),
//             this.askForQualification.bind(this),
//             this.askIfWorking.bind(this),
//             this.handleWorkingStatusResponse.bind(this),
//             this.askForCountry.bind(this),
//             this.askForState.bind(this),
//             this.askForDistrict.bind(this),
//             this.showSummary.bind(this)
//         ]));

//         this.initialDialogId = WATERFALL_DIALOG;
//     }

//     async askForName(step) {
//         const cardPath = path.join(__dirname, '../cards/namePromptCard.json');
//         const cardTemplate = JSON.parse(fs.readFileSync(cardPath, 'utf8'));

//         await step.context.sendActivity({
//             attachments: [CardFactory.adaptiveCard(cardTemplate)]
//         });

//         return Dialog.EndOfTurn;
//     }

//     async askForAge(step) {
//         const name = step.context.activity.value?.name || 'Not provided';
//         step.values.name = name;

//         const cardPath = path.join(__dirname, '../cards/agePromptCard.json');
//         const cardTemplate = JSON.parse(fs.readFileSync(cardPath, 'utf8'));

//         await step.context.sendActivity({
//             attachments: [CardFactory.adaptiveCard(cardTemplate)]
//         });

//         return Dialog.EndOfTurn;
//     }

//     async askForQualification(step) {
//         const age = step.context.activity.value?.age || 'Not provided';
//         step.values.age = age;

//         const cardPath = path.join(__dirname, '../cards/qualificationPromptCard.json');
//         const cardTemplate = JSON.parse(fs.readFileSync(cardPath, 'utf8'));

//         await step.context.sendActivity({
//             attachments: [CardFactory.adaptiveCard(cardTemplate)]
//         });

//         return Dialog.EndOfTurn;
//     }

//     async askIfWorking(step) {
//         const qualification = step.context.activity.value?.qualification || 'Not provided';
//         step.values.qualification = qualification;

//         const cardPath = path.join(__dirname, '../cards/workingStatusPromptCard.json');
//         const cardTemplate = JSON.parse(fs.readFileSync(cardPath, 'utf8'));

//         await step.context.sendActivity({
//             attachments: [CardFactory.adaptiveCard(cardTemplate)]
//         });

//         return Dialog.EndOfTurn;
//     }

//     async handleWorkingStatusResponse(step) {
//         const workingStatus = step.context.activity.value?.workingStatus || 'Not provided';
//         step.values.workingStatus = workingStatus;

//         if (workingStatus === 'Yes') {
//             return await this.askForSalary(step);
//         } else {
//             return await this.askForCountry(step);
//         }
//     }

//     async askForSalary(step) {
//         const cardPath = path.join(__dirname, '../cards/salaryPromptCard.json');
//         const cardTemplate = JSON.parse(fs.readFileSync(cardPath, 'utf8'));

//         await step.context.sendActivity({
//             attachments: [CardFactory.adaptiveCard(cardTemplate)]
//         });

//         return Dialog.EndOfTurn;
//     }

//     async askForCountry(step) {
//         const salary = step.context.activity.value?.salary || 'Not provided';
//         step.values.salary = salary;

//         const cardPath = path.join(__dirname, '../cards/countryPromptCard.json');
//         const cardTemplate = JSON.parse(fs.readFileSync(cardPath, 'utf8'));

//         await step.context.sendActivity({
//             attachments: [CardFactory.adaptiveCard(cardTemplate)]
//         });

//         return Dialog.EndOfTurn;
//     }

//     async askForState(step) {
//         const country = step.context.activity.value?.country || 'Not provided';
//         step.values.country = country;

//         const cardPath = path.join(__dirname, '../cards/statePromptCard.json');
//         const cardTemplate = JSON.parse(fs.readFileSync(cardPath, 'utf8'));

//         await step.context.sendActivity({
//             attachments: [CardFactory.adaptiveCard(cardTemplate)]
//         });

//         return Dialog.EndOfTurn;
//     }

//     async askForDistrict(step) {
//         const state = step.context.activity.value?.state || 'Not provided';
//         step.values.state = state;

//         const cardPath = path.join(__dirname, '../cards/districtPromptCard.json');
//         const cardTemplate = JSON.parse(fs.readFileSync(cardPath, 'utf8'));

//         await step.context.sendActivity({
//             attachments: [CardFactory.adaptiveCard(cardTemplate)]
//         });

//         return Dialog.EndOfTurn;
//     }

//     async showSummary(step) {
//         const district = step.context.activity.value?.district || 'Not provided';
//         step.values.district = district;

//         const { name = 'Not provided', age = 'Not provided', qualification = 'Not provided', workingStatus = 'Not provided', salary = 'Not provided', country = 'Not provided', state = 'Not provided' } = step.values;

//         const summaryCard = {
//             "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
//             "type": "AdaptiveCard",
//             "version": "1.2",
//             "body": [
//                 {
//                     "type": "TextBlock",
//                     "text": `Name: ${name}`,
//                     "wrap": true
//                 },
//                 {
//                     "type": "TextBlock",
//                     "text": `Age: ${age}`,
//                     "wrap": true
//                 },
//                 {
//                     "type": "TextBlock",
//                     "text": `Qualification: ${qualification}`,
//                     "wrap": true
//                 },
//                 {
//                     "type": "TextBlock",
//                     "text": `Working Status: ${workingStatus}`,
//                     "wrap": true
//                 },
//                 {
//                     "type": "TextBlock",
//                     "text": `Salary: ${salary}`,
//                     "wrap": true
//                 },
//                 {
//                     "type": "TextBlock",
//                     "text": `Country: ${country}`,
//                     "wrap": true
//                 },
//                 {
//                     "type": "TextBlock",
//                     "text": `State: ${state}`,
//                     "wrap": true
//                 },
//                 {
//                     "type": "TextBlock",
//                     "text": `District: ${district}`,
//                     "wrap": true
//                 }
//             ]
//         };

//         await step.context.sendActivity({
//             attachments: [CardFactory.adaptiveCard(summaryCard)]
//         });

//         return await step.endDialog();
//     }
// }

// UserDialog.dialogId = USER_DIALOG;
// module.exports.UserDialog = UserDialog;

const { ComponentDialog, TextPrompt, ChoicePrompt, WaterfallDialog, Dialog, NumberPrompt } = require('botbuilder-dialogs');
const { CardFactory } = require('botbuilder');
const fs = require('fs');
const path = require('path');

const USER_DIALOG = 'USER_DIALOG';
const NAME_PROMPT = 'NAME_PROMPT';
const WORKING_STATUS_PROMPT = 'WORKING_STATUS_PROMPT';
const STATE_PROMPT = 'STATE_PROMPT';
const DISTRICT_PROMPT = 'DISTRICT_PROMPT';
const AGE_PROMPT = 'AGE_PROMPT';
const QUALIFICATION_PROMPT = 'QUALIFICATION_PROMPT';
const COMPANY_PROMPT = 'COMPANY_PROMPT';
const WATERFALL_DIALOG = 'WATERFALL_DIALOG';

class UserDialog extends ComponentDialog {
    constructor() {
        super(USER_DIALOG);

        this.addDialog(new TextPrompt(NAME_PROMPT));
        this.addDialog(new ChoicePrompt(WORKING_STATUS_PROMPT));
        this.addDialog(new TextPrompt(STATE_PROMPT));
        this.addDialog(new TextPrompt(DISTRICT_PROMPT));
        this.addDialog(new NumberPrompt(AGE_PROMPT));
        this.addDialog(new TextPrompt(QUALIFICATION_PROMPT));
        this.addDialog(new TextPrompt(COMPANY_PROMPT));

        this.addDialog(new WaterfallDialog(WATERFALL_DIALOG, [
            this.askForName.bind(this),
            this.askForAge.bind(this),
            this.askForQualification.bind(this),
            this.askIfWorking.bind(this),
            this.handleWorkingStatusResponse.bind(this),
            this.askForCountry.bind(this),
            this.askForState.bind(this),
            this.askForDistrict.bind(this),
            this.showSummary.bind(this)
        ]));

        this.initialDialogId = WATERFALL_DIALOG;
    }

    async askForName(stepContext) {
        const cardPath = path.join(__dirname, '../cards/namePromptCard.json');
        const cardTemplate = JSON.parse(fs.readFileSync(cardPath, 'utf8'));

        await stepContext.context.sendActivity({
            attachments: [CardFactory.adaptiveCard(cardTemplate)]
        });

        return Dialog.EndOfTurn;
    }

    async askForAge(stepContext) {
        const name = stepContext.context.activity.value?.name || 'Not provided';
        stepContext.values.name = name;

        const cardPath = path.join(__dirname, '../cards/agePromptCard.json');
        const cardTemplate = JSON.parse(fs.readFileSync(cardPath, 'utf8'));

        await stepContext.context.sendActivity({
            attachments: [CardFactory.adaptiveCard(cardTemplate)]
        });

        return Dialog.EndOfTurn;
    }

    async askForQualification(stepContext) {
        const age = stepContext.context.activity.value?.age || 'Not provided';
        stepContext.values.age = age;

        const cardPath = path.join(__dirname, '../cards/qualificationPromptCard.json');
        const cardTemplate = JSON.parse(fs.readFileSync(cardPath, 'utf8'));

        await stepContext.context.sendActivity({
            attachments: [CardFactory.adaptiveCard(cardTemplate)]
        });

        return Dialog.EndOfTurn;
    }

    async askIfWorking(stepContext) {
        const qualification = stepContext.context.activity.value?.qualification || 'Not provided';
        stepContext.values.qualification = qualification;

        return stepContext.prompt(WORKING_STATUS_PROMPT, {
            prompt: 'Are you currently working?',
            choices: ['Yes', 'No']
        });
    }

    async handleWorkingStatusResponse(stepContext) {
        const workingStatus = stepContext.result.value;
        stepContext.values.workingStatus = workingStatus;

        if (workingStatus === 'Yes') {
            return stepContext.prompt(COMPANY_PROMPT, 'Please provide your company name:');
        } else {
            return stepContext.next();
        }
    }

    async askForCountry(stepContext) {
        if (stepContext.values.workingStatus === 'Yes') {
            stepContext.values.company = stepContext.result; // Store the company value
        }

        const cardPath = path.join(__dirname, '../cards/countryPromptCard.json');
        const cardTemplate = JSON.parse(fs.readFileSync(cardPath, 'utf8'));

        await stepContext.context.sendActivity({
            attachments: [CardFactory.adaptiveCard(cardTemplate)]
        });

        return Dialog.EndOfTurn;
    }

    async askForState(stepContext) {
        const country = stepContext.context.activity.value?.country || 'Not provided';
        stepContext.values.country = country;

        const cardPath = path.join(__dirname, '../cards/statePromptCard.json');
        const cardTemplate = JSON.parse(fs.readFileSync(cardPath, 'utf8'));

        await stepContext.context.sendActivity({
            attachments: [CardFactory.adaptiveCard(cardTemplate)]
        });

        return Dialog.EndOfTurn;
    }

    async askForDistrict(stepContext) {
        const state =stepContext.context.activity.value?.state || 'Not provided';
        stepContext.values.state = state;

        const cardPath = path.join(__dirname, '../cards/districtPromptCard.json');
        const cardTemplate = JSON.parse(fs.readFileSync(cardPath, 'utf8'));

        await stepContext.context.sendActivity({
            attachments: [CardFactory.adaptiveCard(cardTemplate)]
        });

        return Dialog.EndOfTurn;
    }

    async showSummary(stepContext) {
        const district = stepContext.context.activity.value?.district || 'Not provided';
        stepContext.values.district = district;

        const { name, age, qualification, company, country, state } = stepContext.values;

        const summaryCard = {
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "type": "AdaptiveCard",
            "version": "1.2",
            "body": [
                {
                    "type": "TextBlock",
                    "text": "Here is the information you provided:"
                },
                {
                    "type": "TextBlock",
                    "text": `Name: ${name}`,
                    "wrap": true
                },
                {
                    "type": "TextBlock",
                    "text": `Age: ${age}`,
                    "wrap": true
                },
                {
                    "type": "TextBlock",
                    "text": `Qualification: ${qualification || 'Not provided'}`,
                    "wrap": true
                },
                {
                    "type": "TextBlock",
                    "text": `Company: ${company || 'Not provided'}`,
                    "wrap": true
                },
                {
                    "type": "TextBlock",
                    "text": `Country: ${country}`,
                    "wrap": true
                },
                {
                    "type": "TextBlock",
                    "text": `State: ${state}`,
                    "wrap": true
                },
                {
                    "type": "TextBlock",
                    "text": `District: ${district}`,
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

UserDialog.dialogId = USER_DIALOG;
module.exports.UserDialog = UserDialog;
