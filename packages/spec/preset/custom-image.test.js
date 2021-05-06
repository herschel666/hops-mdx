const setup = require('./global-setup');

describe('Demo (preset) => custom image', () => {
  let tearDown = () => undefined;

  beforeAll(async () => {
    const { html, teardownDevServer } = await setup();
    document.body.innerHTML = html;
    tearDown = teardownDevServer;
  }, 15000);

  afterAll(async () => {
    await tearDown();
    document.body.innerHTML = '';
  });

  it('should have custom images', () => {
    const images = document.getElementsByTagName('img');
    const [image] = images;

    expect(images.length).toBe(2),
      expect(image.getAttribute('src').startsWith('/mdx-logo-')).toBe(true);
    expect(image.alt).toBe('MDX Logo');
  });
});
