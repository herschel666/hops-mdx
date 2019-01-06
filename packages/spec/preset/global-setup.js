/* eslint-disable node/no-extraneous-require */
const { setup: setupDevServer } = require('jest-dev-server');
const got = require('got');

const { PORT = '8081' } = process.env;

const delay = (timeout) => new Promise((done) => setTimeout(done, timeout));

module.exports = async (pathname = '/') => {
  await setupDevServer({
    command: `PORT=${PORT} yarn start`,
    launchTimeout: 50000,
    port: Number(PORT),
    usedPortAction: 'kill',
  });
  await delay(10000);
  const pathWithLeadingSlash = pathname.replace(/^(\/+|\b|$)/, '/');
  const { body } = await got(`http://localhost:${PORT}${pathWithLeadingSlash}`);

  return body
    .split(/<body.*>/)
    .pop()
    .split('</body>')
    .shift()
    .trim();
};
