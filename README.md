# React Native Font Face

### What is it?

[CSS Font Face](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face) is a powerful way of grouping multiple fonts files, into a single group, and then based on the passed properties, dynamically changing the font file.

There's no solution like that for React Native, so this project aims to fix that.

---

### How to use it?

#### 1. Declare a global constant as your font face

##### `font.tsx`

```tsx
export type FontName = 'Roboto';
export type FontFamilies = 'Roboto-Bold' | 'Roboto-Italic' | 'Roboto-Regular';

export const fontFace = setFontFace<FontName, FontFamilies>([
  {
    font: 'Roboto-Regular',
    style: {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: '400',
    },
  },
  {
    font: 'Roboto-Bold',
    style: {
      fontStyle: 'normal',
      fontFamily: 'Roboto',
      fontWeight: '600',
    },
  },
  {
    font: 'Roboto-Italic',
    style: {
      fontWeight: '400',
      fontFamily: 'Roboto',
      fontStyle: 'italic',
    },
  },
]);
```

#### 2. Make a Text component which gets the `fontFamily` from the passed `style` and the global constant font face

##### `text.tsx`

```tsx
type Props = {
  children?: ReactNode;
  style?: TextStyle;
};

const Txt = ({
  children,
  style: { fontFamily = 'Roboto', fontWeight = '400', fontStyle = 'normal', ...style } = {} as TextStyle,
}: Props) => {
  // Defining the Font Key in a separate variable, so we can type it for the index of the Object
  const fontKey: FontKey<FontName> = `${fontFamily as FontName}.${fontStyle}.${fontWeight}` || 'Roboto.normal.400';
  // Get the actual font from the fonts Object matching the key, or use a fallback
  const _fontFamily = fontFace[fontKey] || fontFace['Roboto.normal.400'];

  return <Text style={{ fontFamily: _fontFamily, ...style }}>{children}</Text>;
};

export default Txt;
```

And that's it ☺️

Now the Component will dynamically select which font file to use, when displaying that font.
