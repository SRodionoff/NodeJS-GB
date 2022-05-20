const fs = require('fs');
const readStream = new fs.ReadStream('./access.log', 'utf8');
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
        const transformedChunk1 = chunk.toString().match(/^89.123.1.41 .*/gm).join('\n');
        writeStream1.write(transformedChunk1 + "\n");
        callback(null, transformedChunk1);

    }
});
const transformStream2 = new Transform({
    transform(chunk, encoding, callback) {
        const transformedChunk2 = chunk.toString().match(/^34.48.240.111 .*/gm).join('\n');
        writeStream2.write(transformedChunk2 + "\n");
        callback(null, transformedChunk2);

    }
});

readStream.pipe(transformStream1).pipe(writeStream1);
readStream.pipe(transformStream2).pipe(writeStream2);