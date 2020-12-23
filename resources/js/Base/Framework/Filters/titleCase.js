export default (input = '') => {
    return input
        ? input
              .toLowerCase()
              .split(' ')
              .map((str) => {
                  return str[0].toUpperCase() + str.substr(1);
              })
              .join(' ')
        : '';
};
