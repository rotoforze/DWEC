document.addEventListener('DOMContentLoaded', init);

async function init() {
    const logContent = await fethcData();
    const logParsed = parseLog(logContent);
    parseJSONToHTML(logParsed)
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
                id: log[i].slice(log[i].indexOf(':') + 6, log[i].length),
                user: log[i + 1].slice(log[i + 1].indexOf(':') + 1, log[i + 1].length),
                consumoEnMB: (
                    Number.parseFloat(
                        log[i + 2]
                            .slice(0, log[i + 2].indexOf('bytes'))
                            .slice(log[i + 2].indexOf(':') + 1))
                    / (1024 * 1024)).toFixed(2),
                status: log[i + 3].slice(log[i + 3].indexOf(':') + 1, log[i + 3].length)
            })

        } else canContinue = false;
    }

    return users;
}

function parseJSONToHTML(logArray = []) {
    const contenedor = document.querySelector('tbody');
    let consumoTotal = 0;
    for (const log of logArray) {
        consumoTotal += Number.parseFloat(log.consumoEnMB);
        contenedor.innerHTML += `
            <tr class="${log.status.includes('ERROR') ? 'error' : 'ok'}">
                <td>#${log.id}</td>
                <td>${log.user.toLowerCase()}</td>
                <td>${log.consumoEnMB} MB</td>
                <td>
                    <abbr title="${log.status.slice(log.status.indexOf(':')+1, log.status.length)}" id="${log.status.includes('ERROR') ? 'error' : 'ok'}">
                        ${log.status.includes('ERROR') ? log.status.slice(0, log.status.indexOf(':')) : log.status}
                    </abbr>
                </td>
            </tr>
        `;
    }
    document.querySelector('.consumoTotal').innerHTML = consumoTotal.toFixed(2);
}