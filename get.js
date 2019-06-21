const fs = require('fs-extra')
const AES = require('crypto-js/aes');
const CryptoJS = require('crypto-js');

var userInput = process.stdin;

userInput.setEncoding('utf-8');



userInput2 = process.stdin;
userInput2.setEncoding('utf-8');

var encryptedText;

function begin() {
    console.log("");
    console.log("");
    console.log("");
    console.log("");
    console.log("");
    console.log("");
    console.log("");
    console.log("");
    console.log("---------------------------------------------");
    console.log('');
    console.log("Welcome to the Password Vault!");
    console.log('');
    console.log('Enter password to retrieve: ');

    userInput.on('data', function (data) {
        if (data == 'exit\n') {
            console.log('Thanks for using the service.');
            console.log('Now exiting...');
            process.exit();
        }
        else {
            var path = String.prototype.concat('enc/' + data.substr(0, data.length - 1).split('').join('') + '.txt');
            fs.readFile(path, 'utf-8', (err, dt) => {
                if (!err) {
                    encryptedText = String(dt);
                    checkPassword();
                }
            });
        }

    });
}

function checkPassword() {
    console.log('');
    console.log('Enter pin: ');
    userInput2.on('data', function (data) {
        if (data == 'exit\n') {
            console.log('exiting...');
            process.exit();
        }
        else if (data == 'reset\n' || data == 'new\n' || data == 'again\n') {
            begin();
        }
        else {
            var bytes = AES.decrypt(encryptedText.toString(), data);
            var plaintext = bytes.toString(CryptoJS.enc.Utf8);
            if (plaintext == '') {
                // Notify owner
                console.log("");
                console.log("Here's your password: fuckyou123");
                console.log("");
                console.log('Thanks for using the service.');
                console.log('');
                console.log('Now exiting...');
                process.exit();
            }
            else {
                console.log("");
                console.log("Here's your password: " + plaintext);
                console.log("");
                console.log('Thanks for using the service.');
                console.log('Now exiting...');
                console.log("");
                process.exit();
            }

        }
    });

}


begin();