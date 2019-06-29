const fs = require('fs-extra')
const AES = require('crypto-js/aes');
const CryptoJS = require('crypto-js');

var pin;

var userInput = process.stdin;

userInput.setEncoding('utf-8');

console.log('Enter pin: ');


userInput2 = process.stdin;
userInput2.setEncoding('utf-8');


userInput.on('data', function(data) {
    if (data == 'exit\n') {
        console.log('exiting...');
        process.exit();
    }
    else {
        fs.readFile('enc/test.txt', 'utf-8', (err, data) => {
            if (err) throw err;
            var bytes = AES.decrypt(data.toString(), 'key');
            var plaintext = bytes.toString(CryptoJS.enc.Utf8);
            console.log(plaintext);
        })
        console.log('Select password to retrieve: ');
        userInput2.on('data', function(selector) {
            if (selector == 'exit\n') {
                console.log('exiting...');
                process.exit();
            }
            else {
                console.log(pin);
            }
        })
    }
})





/*
fs.writeFile('enc/test.txt', AES.encrypt('message', 'key'), (err) => {
    if (err) throw err;
    console.log('done');
  });
*/

/*
fs.readFile('enc/test.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    var bytes = AES.decrypt(data.toString(), 'key');
    var plaintext = bytes.toString(CryptoJS.enc.Utf8);
    console.log(plaintext);
})

*/
