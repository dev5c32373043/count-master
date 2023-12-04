export const to = async promise => promise.then(data => [null, data]).catch(err => [err]);

export * from './logger';
