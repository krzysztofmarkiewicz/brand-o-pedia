import {
    writeFile,
    readFile
} from "fs"

export function timeCount() {
    let today = new Date();

    let day = today.getDate();
    let month = today.getMonth();
    let year = today.getFullYear();

    let hour = today.getHours();
    if (hour < 10) hour = "0" + hour;

    let minute = today.getMinutes();

    let second = today.getSeconds();

    return year + '.' + month + '.' + day + ' - ' + hour + ':' + minute + ':' + second
}

export const saveLog = (content) => {
    try {
        const textToAppend = content + ": " + timeCount() + '\n';

        readFile('./logs', (err, data) => {
            if (err) throw err

            const actuallLogs = data
            const newLogs = actuallLogs + textToAppend

            writeFile('./logs', newLogs, (err) => {
                if (err) throw err
            });
        })
    } catch (err) {
        console.error(err);
    }
}