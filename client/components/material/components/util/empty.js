/// Takes a value of any type and attempts to return wether it contains
/// meaniningful information.
///
/// This removes the need for type checking in a lot of situations where we
/// aren't sure what the possible empty values are for a field.
///
/// Take a look at implementation for details.
const isEmpty = (val) => {
  if (val === undefined || val === null) return true
  if (val instanceof Array) {
    return val.length === 0
  } else if (typeof val === 'string') {
    return val === ''
  } else if (typeof val === 'object') {
    // This is questionable...
    return isEmpty(Object.keys(val))
  } else {
    return false
  }
}

module.exports.isEmpty = isEmpty;

/// Self explanatory.
const isNotEmpty = (val) => !isEmpty(val);

module.exports.isNotEmpty = isNotEmpty;

///
const coalesce = (...values) => {
  for (let i = 0; i < values.length; i++) {
    if (isNotEmpty(values[i])) {
      return values[i];
    }
  }
  return null;
};

module.exports.coalesce = coalesce;
