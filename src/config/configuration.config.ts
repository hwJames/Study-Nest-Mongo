export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  env: process.env.NODE_ENV || 'dev',
  isProd: isProd(process.env.NODE_ENV) || false,
});

const isProd = (env: string) => {
  if (env == 'prod') {
    return true;
  } else {
    return false;
  }
};
