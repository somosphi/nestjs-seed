export default () => {
  process.env = {
    HTTP_PORT: '1337',
    NODE_ENV: 'test',
    TYPEORM_CONNECTION: 'mysql',
    TYPEORM_HOST: 'localhost',
    TYPEORM_PORT: '33O6',
    TYPEORM_DATABASE: 'seed_nest',
    TYPEORM_USERNAME: 'root',
    TYPEORM_PASSWORD: '',
    APM_SERVICE_NAME: 'opa',
    APM_SERVICE_URL: 'localhost',
    JSONPLACEHOLDER_URL: 'https://jsonplaceholder.typicode.com',
    JSONPLACEHOLDER_TIMEOUT: '10000',
  };
};
