export const history = {
  navigate: null,
  location: null
};

export const to = async promise => promise.then(data => [null, data]).catch(err => [err]);

export * from './request';
