// eslint-disable-next-line node/no-extraneous-require
const { teardown: teardownDevServer } = require('jest-dev-server');
const setup = require('./global-setup');

describe('Demo (preset) => custom image', () => {
  beforeAll(async () => {
    document.body.innerHTML = await setup('/custom-image');
  }, 15000);

  afterAll(async () => {
    await teardownDevServer();
    document.body.innerHTML = '';
  });

  it('should have a custom image', () => {
    const images = Array.from(
      document.querySelectorAll('[data-type="custom-image"]')
    );
    const [image] = images;

    expect(images.length).toBe(2),
      expect(image.getAttribute('src').startsWith('/mdx-logo-')).toBe(true);
    expect(image.alt).toBe('MDX Logo');
  });
});
