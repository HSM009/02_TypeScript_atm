#! /usr/bin/env node
console.clear();
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";
import chalk from "chalk";
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
async function testDesc() {
    for (let i = 0; i < 5; i++) {
        let seq = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
        arrPins.push(seq);
    }
    console.log('This is a testing application. Enter one of these pin codes to continue transaction ' + chalk.inverse(arrPins));
}
async function AtmQuestions() {
    var e = await inquirer.prompt([
        {
            type: 'input',
            name: 'pinCode',
            message: "Enter the Pin Code: ",
            validate(value) {
                const pass = value.match(/^\d{4}$/g);
                if (pass) {
                    for (let i = 0; i < arrPins.length; i++) {
                        if (value == arrPins[i]) {
                            return true;
                        }
                        else if (i == arrPins.length - 1) {
                            return chalk.bgRed("Pin Code does not exist or wrong.");
                        }
                    }
                }
                return chalk.bgRed("Please enter a valid 4 digits pin code.");
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
            validate: function (value) {
                if (isNaN(value)) {
                    return chalk.bgRedBright('Input wrong. Must enter number.');
                }
                else {
                    return true;
                }
            },
            when(oA) {
                return oA.amount == "Other Amount";
            }
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
async function enterAgain() {
    do {
        await AtmQuestions();
        var re = await inquirer.prompt([
            {
                type: "confirm",
                name: "restart",
                message: "Do you like to restart program? Y/N",
            }
        ]);
    } while (re.restart);
}
//-----------------------------------------------------------------------------------------------
var arrPins = [];
await welcome();
await testDesc();
await enterAgain();
