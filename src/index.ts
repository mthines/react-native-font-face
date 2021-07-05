import { TextStyle } from 'react-native';

type FontFamily = TextStyle['fontFamily'];

type FontWeight = TextStyle['fontWeight'];

type FontStyle = TextStyle['fontStyle'];

type FontName = string;

type Fonts<
  FN extends FontName,
  FF extends FontFamily = FontFamily,
  FW extends FontWeight = FontWeight,
  FS extends FontStyle = FontStyle,
> = {
  font: FF;
  style: {
    fontFamily: FN;
    fontWeight: FW;
    fontStyle: FS;
  };
}[];

export type FontKey<
  FN extends FontName,
  FW extends FontWeight = FontWeight,
  FS extends FontStyle = FontStyle,
> = `${FN}.${NonNullable<FS>}.${NonNullable<FW>}`;

/**
 * ### Font Face
 * Generate the Font Face object consisting of all the font files, mapped out into unique keys.
 *
 * @returns Object with All available fonts by unique key
 *
 * `fontFamily.fontStyle.fontWeight`
 * 
 * If the `Style` Properties passed to the `Style` of the component, matches one of `Style` in the `fontFace` object, 
 * then it will return the FontFamily that matches that.
 * 
 * @see Fonts
 * 
 * @example
 * ```ts
  export type FontName = 'Roboto' | 'RobotoSlab';

  export const fontFace = setFontFace<FontName>([
    {
      font: 'font1',
      style: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '400',
      },
    },
    {
      font: 'font2',
      style: {
        fontStyle: 'normal',
        fontFamily: 'Roboto',
        fontWeight: '600',
      },
    },
    {
      font: 'font3',
      style: {
        fontWeight: '400',
        fontFamily: 'Roboto',
        fontStyle: 'italic',
      },
    },
  ]);
 * ```
 */
export const setFontFace = <FN extends FontName, FF extends FontFamily = FontFamily>(
  /**
   * Array of Fonts you want to be available
   */
  fonts: Fonts<FN, FF>,
): Partial<Record<FontKey<FN>, FF>> =>
  Object.values(fonts).reduce(
    (_fonts, _font) => ({
      ..._fonts,
      [`${_font.style.fontFamily}.${_font.style.fontStyle}.${_font.style.fontWeight}`]: _font.font,
    }),
    {},
  );
