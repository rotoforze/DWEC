/**
 * Recibe dos divisas y convierte de la primera a la segunda.
 * 
 * @param {String} from 
 * @param {String} to 
 * @param {float} amount 
 * @returns {float}
 */
export async function convert(from, to, amount) {
    return new Promise((resolve, reject) => fetch(`https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`)
        .then((resp) => resp.json())
        .then((data) => {
            resolve((amount * data.rates[to]).toFixed(2));
        }));
}
