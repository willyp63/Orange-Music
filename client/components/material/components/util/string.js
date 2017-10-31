const equalIgnoreCase = (str1, str2) => {
  return typeof str1 === 'string' &&
         typeof str2 === 'string' &&
         str1.toUpperCase() === str2.toUpperCase();
};

module.exports.equalIgnoreCase = equalIgnoreCase;

const notEqualIgnoreCase = (str1, str2) => !equalIgnoreCase(str1, str2);

module.exports.notEqualIgnoreCase = notEqualIgnoreCase;

const sentenceCase = (str) => {
  return str[0].toUpperCase() + str.substring(1).toLowerCase();
};

module.exports.sentenceCase = sentenceCase;
