import { ofetch } from 'ofetch';
import { history } from './';

const request = ofetch.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  onRequest({ options }) {
    options.headers ||= {};
    options.headers.Authorization = `jwt ${window.localStorage.getItem('__jwt')}`;
  },
  onResponseError({ response }) {
    if (response.status === 401) {
      history.navigate('/login');
    }
  }
});

export { request };
