import qs from 'qs';
import Config from '../Config';

function myfetch({ url, data, method = 'POST', headers = {}, dataType }) {
  if (!url) {
    throw new Error('url is not defined!');
  }
  let fullUrl = url.indexOf('http') === 0
    ? url
    : url.indexOf('/') === 0 ? `${Config.host}${url}` : `${Config.host}/${url}`;
  let options = {
    method: method.toUpperCase(),
    headers: {
      ...headers,
      // 'Content-Encoding': 'gzip',
      'Cache-Control': 'no-cache',
    },
  };
  if (options.method === 'GET' || options.method === 'PUT') {
    fullUrl += `?${qs.stringify(data)}`;
  } else {
    options = {
      ...options,
      body: qs.stringify(data),
      headers: {
        ...options.headers,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
  }
  if (dataType === 'json') {
    options = {
      ...options,
      body: JSON.stringify(data),
      headers: {
        ...options.headers,
        'Content-Type': 'application/json',
      },
    };
  }
  const p = Promise.race([
    fetch(fullUrl, options),
    new Promise((resolv, reject) => {
      setTimeout(() => reject(new Error('网络加载超时')), 5000);
    }),
  ]);
  return p.then((response) => {
    if (response.status === 401 || response.status === 400) {
      throw new Error(response.status);
    } else if (
      (response.status > 299 || response.status < 200) &&
      response.status !== 304
    ) {
      throw new Error('服务繁忙，请稍后再试');
    }
    return response.json();
  })
  .then((json) => {
    if (json.status) {
      const { code, userMessage } = json.status;
      if (code !== '000000') {
        throw new Error(code + userMessage);
      }
    }
    console.log(json)
    return { response: json };
  })
  .catch(error => ({ error }));
}

export default {
  fetch: myfetch,
  getAddressMetadata: () =>
    new Promise((resolve, reject) => {
      setTimeout(() => resolve(require('../Fixtures/city.json')), 100);
    }),
};