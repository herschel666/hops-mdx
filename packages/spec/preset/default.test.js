const setup = require('./global-setup');

describe('Demo (preset) => default', () => {
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

  it('should have a headline', () => {
    const [headline] = document.getElementsByTagName('h1');

    expect(headline.textContent).toBe('Hops-MDX!');
  });

  it('should have the logo', () => {
    const [image] = Array.from(document.getElementsByTagName('img'));

    expect(image.getAttribute('src').startsWith('/mdx-logo-')).toBe(true);
    expect(image.getAttribute('src').endsWith('.svg')).toBe(true);
    expect(image.alt).toBe('MDX Logo');
  });

  it('should render the emoji', () => {
    const ps = Array.from(document.getElementsByTagName('p'));
    const { textContent: text } = ps.find(({ textContent }) =>
      textContent.startsWith('Hello world!')
    );

    expect(text.indexOf('👍') > -1).toBe(true);
  });
});
