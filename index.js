const axios = require('axios');
const { rutCalcDv } = require('rutfunctions');

const numbers = [];

const URL = 'http://www.bbva-scotiabank.com/persona/acesso.php';

let index = 0;
const asyncIterator = {
  next: () => {
    if (index >= numbers.length) {
      // A conventional iterator would return a `{ done: true }`
      // object. An async iterator returns a promise that resolves
      // to `{ done: true }`
      return Promise.resolve({ done: true });
    }
    const value = numbers[index++];
    return Promise.resolve({ value, done: false });
  }
};

const asyncIterable = {
  [Symbol.asyncIterator]: () => asyncIterator
};

const execute = async payload => {
  try {
    const response = await axios.post(URL, payload, { timeout: 5000 });
    return response;
  } catch (e) {
    return execute(payload);
  }
};

async function main() {
  for (let i = 0; i < 10000000; i += 1) numbers.push(i);

  // eslint-disable-next-line no-restricted-syntax
  for await (const val of asyncIterable) {
    const RUT = Math.round(Math.random() * (25000000 - 5000000)) + 5000000;
    const DV = rutCalcDv(RUT);
    const PASS = Math.floor(1000 + Math.random() * 9000000);

    const formattedRut = `${RUT}-${DV}`;

    const payload = {
      is_rut: formattedRut,
      is_clave: PASS.toString(),
      is_enter: 'Ingresar',
      sender: 'index',
      is_valid_rut: 1,
      is_valid_clave: 1
    };

    const response = await execute(payload);
    console.log(`${val + 1} | RUT: ${formattedRut} | PASS: ${PASS} | HTTP ${response.status}`);
  }
}

main().catch(error => console.error(error.stack));
