const isEmpty = require('lodash.isEmpty');

/// Returns [url]'s params.
const getUrlParams = (url) => {
  let matches = url.match(/\?(.+)$/)
  if (isEmpty(matches)) return {}
  const paramsStr =  matches[1]
  const paramStrings = paramsStr.split('&')
  const params = {}
  paramStrings.forEach((paramStr) => {
    matches = paramStr.match(/(.+)=(.+)/)
    if (!isEmpty(matches) &&
        !isEmpty(matches[1]) &&
        !isEmpty(matches[2])) {
      params[matches[1]] = matches[2]
    }
  })
  return params
}

/// Updates [url]'s params by merging them with [params], and returns the
/// resulting URL.
const getUrlWithUpdatedParams = (url, params) => {
  const baseUrlMatches = url.match(/^(.+?)(?:\?|$)/);
  const baseUrl = !isEmpty(baseUrlMatches) ? baseUrlMatches[1] : '';
  const updatedParams = getUrlParams(url);
  Object.keys(params).forEach((key) => {
    updatedParams[key] = encodeURIComponent(params[key]);
  });
  const paramsStr = Object.keys(updatedParams)
      .filter((key) => !isEmpty(key) && !isEmpty(updatedParams[key]))
      .map((key) => key + '=' + updatedParams[key])
      .join('&');
  return !isEmpty(paramsStr) ? (baseUrl + '?' + paramsStr) : baseUrl;
}

module.exports = {
  getUrlParams,
  getUrlWithUpdatedParams,
};
