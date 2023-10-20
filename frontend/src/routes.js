const apiPath = '/api/v1';

export default {
  login: () => [apiPath, 'login'].join('/'),
  data: () => [apiPath, 'data'].join('/'),
};
