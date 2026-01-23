document.addEventListener('DOMContentLoaded', init);

async function init() {
    const logContent = await fethcData();
    const logParsed = parseLog(logContent);
}

async function fethcData() {
    return new Promise((resolve, reject) => {
        fetch('./data/logs.txt')
            .then((text) => resolve(text.text()))
            .catch(e => reject(e));
    });
}

function parseLog(log = '') {
    if (log.length < 1) return;
    
    log = log.replaceAll(' ', '');
    log = log.replaceAll('\r\n', '|');
    log = log.split('|');

    let canContinue = true;
    let users = [];

    for (let i = 0; canContinue; i += 4) {
        if (log[i] != undefined && log[i].includes('ID:')) {
            users.push({
                id: log[i].slice(log[i].indexOf(':')+6, log[i].length),
                user: log[i+1].slice(log[i+1].indexOf(':')+1, log[i+1].length),
                consumo: log[i+2].slice(0, log[i+2].indexOf('bytes')).slice(log[i+2].indexOf(':')+1, log[i+2].length),
                status: log[i+3].slice(log[i+3].indexOf(':')+1, log[i+3].length)
            })

        }else canContinue = false;
    }

    return users;
}