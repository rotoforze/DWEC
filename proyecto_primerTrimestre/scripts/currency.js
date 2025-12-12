export async function convert(from, to, amount) {
    return new Promise((resolve, reject) => fetch(`https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`)
        .then((resp) => resp.json())
        .then((data) => {
            return (amount * data.rates[to]).toFixed(2);
        }));
}
