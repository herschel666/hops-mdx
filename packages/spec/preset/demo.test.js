const { teardown: teardownDevServer } = require('jest-dev-server');
const setup = require('./global-setup');

describe('Demo (preset)', () => {
  beforeAll(async () => {
    document.body.innerHTML = await setup();
  });

  afterAll(async () => {
    await teardownDevServer();
    document.body.innerHTML = '';
  });

  it('should have a headline', () => {
    const headline = document.getElementById('hops-mdx');

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
