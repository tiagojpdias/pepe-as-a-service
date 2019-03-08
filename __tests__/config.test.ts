import config from '../config';

describe('Config', () => {
  it('No file path provided', () => {
    expect(config()).toBeUndefined();
  });

  it('Access invalid file', () => {
    expect(config('invalidFile.batatas')).toBeUndefined();
  });

  it('Access valid file', () => {
    expect(config('images.width')).toBeDefined();
  });

  it('Access valid already loaded', () => {
    expect(config('images.width')).toBeDefined();
    expect(config('images.height')).toBeDefined();
  });
});
