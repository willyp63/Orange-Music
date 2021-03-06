export const equalIgnoreCase = (str1, str2) => {
  return typeof str1 === 'string' &&
         typeof str2 === 'string' &&
         str1.toUpperCase() === str2.toUpperCase();
};

export const notEqualIgnoreCase = (str1, str2) => !equalIgnoreCase(str1, str2);

export const sentenceCase = (str) => {
  return str[0].toUpperCase() + str.substring(1).toLowerCase();
};
