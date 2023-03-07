#! /usr/bin/env node
console.clear();
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";
const stopTime = () => {
    return new Promise((res) => {
        setTimeout(res, 3500);
    });
};
async function welcome() {
    let rainbowTitle = chalkAnimation.neon("Welcome To ATM Banking!\n\nCoded By Hosein Sirat Mohammad\n");
    await stopTime();
    rainbowTitle.stop();
}
await welcome();
async function AtmQuestions() {
    var e = await inquirer.prompt([
        {
            type: 'input',
            name: 'pinCode',
            message: "Enter the Pin Code: ",
            validate(value) {
                let num1 = value;
                const pass = value.match(/^\d{4}$/g);
                if (pass) {
                    return true;
                }
                return 'Please enter a valid 4 digits pin code.';
            },
        },
        {
            type: "list",
            name: "accountType",
            message: "Choose the account type.",
            choices: ['Current', 'Saving', 'Default']
        },
        {
            type: "list",
            name: "amount",
            message: "Select the amount.",
            choices: ['1000', '3000', '5000', '10000', 'Other Amount']
        },
        {
            type: "input",
            name: "OtherAmount",
            message: "Specify the other amount.",
            when(oA) {
                return oA.amount == "Other Amount";
            },
        }
    ])
        .then((answers) => {
        // if(answers.amount == 'Other Amount')
        // {
        //     console.log('Other amount selected.');
        // }
        console.log('\nOrder receipt:');
        console.log(JSON.stringify(answers, null, '  '));
    });
}
do {
    await AtmQuestions();
    var re = await inquirer.prompt([
        {
            type: "confirm",
            name: "restart",
            message: "Do you like to restart program? Y/N"
        }
    ]);
} while (re.restart);
