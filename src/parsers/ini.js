import ini from 'ini';

const parseIni = (data) => {
  const dataParse = ini.parse(data);
  const dataConverted = JSON.stringify(dataParse, (key, value) => {
    const valueConvert = parseFloat(value);

    if (!Number.isNaN(valueConvert)) {
      return valueConvert;
    }

    return value;
  });

  return JSON.parse(dataConverted);
};

export default parseIni;
