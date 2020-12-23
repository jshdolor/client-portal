const trimString = (value, maxLength, ellipticize) => {
    value = value || '';

    if (value.length >= maxLength) {
        value = value.substr(0, maxLength) + (ellipticize ? '...' : '');
    }

    return value;
};

const removeTags = (str = '') => {
    return str.replace(/<[^>]*>?/gm, '');
};

const titleCase = (str, replaceStrArr = []) => {
    replaceStrArr.forEach((repStr) => {
        str = str.replace(new RegExp(repStr, 'g'), ' ');
    });

    return str
        .split(' ')
        .map((r) => {
            return r[0].toUpperCase() + r.substr(1).toLowerCase();
        })
        .join(' ');
};

const currency = (num = 0, currency = '', decimalPlaces = 2) => {
    return `${currency} ${parseFloat(num)
        .toFixed(decimalPlaces)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
};

const replaceTextValues = (target = '', values = {}) => {
    let tempText = target;
    for (let key in values) {
        const re = new RegExp(`%${key}%`, 'g');
        tempText = target.replace(re, values[key]);
    }
    return tempText;
};

export { trimString, titleCase, removeTags, currency, replaceTextValues };
