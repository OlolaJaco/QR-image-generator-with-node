import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs'

// 1. Use the inquirer npm package to get user input.

inquirer
  .prompt([
    {
        type: 'input',
        name: 'url',
        message: 'Enter the URL to generate a QR code:',
    }
  ])
  .then((answers) => {
    // 2. Use the qr-image npm package to turn the user entered URL into a QR code image.
    const url = answers.url;
    let qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream('qr-image.png'));

    // writing a new url text file
    fs.writeFile('url.txt', url, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
// 3. Create a txt file to save the user input using the native fs node module.


