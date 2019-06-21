const fs = require('fs-extra')
const AES = require('crypto-js/aes');
const CryptoJS = require('crypto-js');

var pin;

var userInput = process.stdin;

userInput.setEncoding('utf-8');

var keySet;
var keyMap = [];

fs.readFile('temp.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    keySet = String(data);
    var service = '';
    var pin = '';
    var state = 0;
    for (var i = 0; i < keySet.length; i++) {
        if (keySet[i] == ':') {
            state = 1;
        }
        else if (keySet[i] == ',' || i == (keySet.length - 1)) {
            keyMap.push([service, pin]);
            service = '';
            pin = '';
            state = 0;
        }
        else if (state == 0) {
            service += keySet[i];
        }
        else if (state == 1) {
            pin += keySet[i];
        }
    }
    console.log('Reading complete. Enter pin: ');
    createFiles(keyMap, -1, keyMap.length);
    //promptInput();
})


function createFiles(arr, i, l) {
    if (i == -1) {
        userInput.on('data', function (data) {
            if (data == 'exit\n') {
                console.log('exiting...');
                process.exit();
            }
            else {
                pin = data;
                createFiles(arr, i + 1, l);
            }
        })
    }
    else if (i != l) {
        fs.writeFile('enc/' + arr[i][0] + '.txt', AES.encrypt(arr[i][1], pin), (err) => {
            if (err) throw err;
            createFiles(arr, i + 1, l);
        });
    }
    else {
        fs.writeFile('temp.txt', '', (err) => {
            if (err) throw err;
            console.log('All done.');
        });
    }
}

/*
function promptInput() {
    userInput.on('data', function(data) {
        if (data == 'exit\n') {
            console.log('exiting...');
            process.exit();
        }
        else {
            fs.writeFile('enc/keys.txt', AES.encrypt(keySet, data), (err) => {
                if (err) throw err;
                console.log('done');
              });
        }
    })
}
*/




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
