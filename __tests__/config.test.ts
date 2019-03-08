import config from '../config';

describe('Config', () => {
  it('Access invalid file', () => {
    expect(config('invalidFile.batatas')).toBeUndefined();
  });

  it('Access valid file', () => {
    expect(config('images.width')).toBeDefined();
  });
});
