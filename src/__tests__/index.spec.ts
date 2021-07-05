import { expect } from 'chai';

import { setFontFace } from '../index';

describe('React Native: Font Face', function () {
  const fonts = setFontFace<'font', 'font1' | 'font2' | 'font3'>([
    { font: 'font1', style: { fontFamily: 'font', fontStyle: 'normal', fontWeight: '400' } },
    { font: 'font2', style: { fontStyle: 'normal', fontFamily: 'font', fontWeight: '600' } },
    { font: 'font3', style: { fontWeight: '400', fontFamily: 'font', fontStyle: 'italic' } },
  ]);

  const fontKeys = Object.keys(fonts);

  it('Normal Regular: Check font key', function () {
    expect(fontKeys[0]).to.equal('font.normal.400');
  });
  it('Normal Regular: Check returned font family', function () {
    expect(fonts['font.normal.400']).to.equal('font1');
  });

  it('Normal Bold: Check font key', function () {
    expect(fontKeys[1]).to.equal('font.normal.600');
  });
  it('Normal Bold: Check returned font family', function () {
    expect(fonts['font.normal.600']).to.equal('font2');
  });

  it('Italic Regular: Check font key', function () {
    expect(fontKeys[2]).to.equal('font.italic.400');
  });
  it('Italic Regular: Check returned font family', function () {
    expect(fonts['font.italic.400']).to.equal('font3');
  });
});
