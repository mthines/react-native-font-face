import { TextStyle } from 'react-native';

export type FontFamily = TextStyle['fontFamily'];
export type FontWeight = TextStyle['fontWeight'];
export type FontStyle = TextStyle['fontStyle'];

export type FontKey<
  FN extends string,
  FW extends FontWeight = FontWeight,
  FS extends FontStyle = FontStyle,
> = `${FN}.${NonNullable<FS>}.${NonNullable<FW>}`;

type Fonts<FN extends string, FF extends FontFamily = FontFamily, FW extends FontWeight = FontWeight, FS extends FontStyle = FontStyle> = {
  font: FF;
  style: {
    fontFamily: FN;
    fontWeight: FW;
    fontStyle: FS;
  };
}[];

/**
 * TODO: Add documentation
 * @returns Object with All available fonts by unique key
 */
export const fontFaceKeys = <FN extends string, FF extends FontFamily = FontFamily>(
  fonts: Fonts<FN, FF>,
): Partial<Record<FontKey<FN>, string>> =>
  Object.values(fonts).reduce(
    (_fonts, _font) => ({
      ..._fonts,
      [`${_font.style.fontFamily}.${_font.style.fontStyle}.${_font.style.fontWeight}`]: _font.font,
    }),
    {},
  );
