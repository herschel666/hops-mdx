/* eslint-disable node/no-extraneous-require */
const { setup: setupDevServer } = require('jest-dev-server');
const got = require('got');

const { PORT = '8081' } = process.env;

module.exports = async () => {
  await setupDevServer({
    command: `PORT=${PORT} yarn start`,
    launchTimeout: 100000,
    port: Number(PORT),
    usedPortAction: 'kill',
  });
  const { body } = await got(`http://localhost:${PORT}/`);

  return body
    .split(/<body.*>/)
    .pop()
    .split('</body>')
    .shift()
    .trim();
};
