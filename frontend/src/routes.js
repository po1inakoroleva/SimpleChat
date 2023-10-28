const apiPath = '/api/v1';

export default {
  login: () => `${apiPath}/login`,
  data: () => `${apiPath}/data`,
  loginPage: () => '/login',
  mainPage: () => '/',
};
