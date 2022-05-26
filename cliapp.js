const fs = require('fs');
const path = require("path");
const inquirer = require("inquirer");
const inquirerFileTreeSelection = require('inquirer-file-tree-selection-prompt');
inquirer.registerPrompt('file-tree-selection', inquirerFileTreeSelection);
inquirer
    .prompt([
        {
            name: "directory",
            type: "file-tree-selection",
            message: "Choose directory",
        },
    ])
    .then((answer) => {
        const filePath = answer.directory;
        const readStream = new fs.ReadStream(filePath, 'utf8');
        const writeStream1 = fs.createWriteStream('./89.123.1.41_requests.log', {
            flags: "a",
            encoding: "utf-8",
        });
        const writeStream2 = fs.createWriteStream('./34.48.240.111_requests.log', {
            flags: "a",
            encoding: "utf-8",
        });
        const { Transform } = require('stream');
        const transformStream1 = new Transform({
            transform(chunk, encoding, callback) {
                const transformedChunk = chunk.toString().match(/^89.123.1.41 .*/gm).join('\n');
                callback(null, transformedChunk);
            }
        });
        const transformStream2 = new Transform({
            transform(chunk, encoding, callback) {
                const transformedChunk = chunk.toString().match(/^34.48.240.111 .*/gm).join('\n');
                callback(null, transformedChunk);
            }
        });
        readStream.pipe(transformStream1).pipe(writeStream1);
        readStream.pipe(transformStream2).pipe(writeStream2);
    });