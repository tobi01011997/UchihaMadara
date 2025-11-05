import { writeFile, readFile, unlink } from 'fs';


function readFromDatabase(callback: (data: string) => void) {
    setTimeout(() => {
        const simulatedData = 'Hello from the Database!';
        callback(simulatedData);
    }, 1000);
}

function writeAndRead() {
    readFromDatabase((data) => {
        writeFile('message.txt', data, (err) => {
            if (err) {
                console.error('Write Error:', err);
            } else {
                console.log('File written successfully.');
            }
        });
    })

    readFile('message.txt', 'utf8', (err, content) => {
        if (err) {
            console.error('Read Error:', err);
        } else {
            console.log('File Content:', content);
        }
    });
}

writeAndRead();
\ No newline at end of file