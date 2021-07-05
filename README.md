# React Native Font Face

### What is it?

[CSS Font Face](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face) is a powerful way of grouping multiple fonts files, into a single group, and then based on the passed properties, dynamically changing the font file.

There's no solution like that for React Native, so this project aims to fix that.

The reasoning behind the approach of an Object with keys like `${fontFamily}.${fontStyle}.${fontWeight}` are due to performance.
Like this we don't need to call a function in the `Txt` component, but can get the value from the object directly, like:

```tsx
fontFace[`${fontFamily}.${fontStyle}.${fontWeight}`]
```

---

### Table of Contents

- [React Native Font Face](#react-native-font-face)
    - [What is it?](#what-is-it)
    - [Table of Contents](#table-of-contents)
    - [Prerequisite](#prerequisite)
    - [How to use it?](#how-to-use-it)
      - [1. Declare a global constant as your font face](#1-declare-a-global-constant-as-your-font-face)
        - [`constants/font.ts`](#constantsfontts)
      - [2. Make a Text component which gets the `fontFamily` from the passed `style` and the global constant font face](#2-make-a-text-component-which-gets-the-fontfamily-from-the-passed-style-and-the-global-constant-font-face)
        - [`components/text.tsx`](#componentstexttsx)
      - [3. Done! Now use the text component ☺️](#3-done-now-use-the-text-component-️)
        - [`components/screen/home.tsx`](#componentsscreenhometsx)

### Prerequisite

You need to have added your custom fonts to the project. See this thread for more: https://stackoverflow.com/a/41827668/1951459

### How to use it?

#### 1. Declare a global constant as your font face

##### `constants/font.ts`

```tsx
import { setFontFace } from '@mthines/react-native-font-face';

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

##### `components/text.tsx`

```tsx
import { fontFace } from 'constants/font.tsx';

type Props = {
  children?: ReactNode;
  style?: TextStyle;
};

const Txt = ({
  children,
  style: { 
    fontFamily = 'Roboto', 
    fontWeight = '400', 
    fontStyle = 'normal', 
    ...style 
  } = {} as TextStyle,
}: Props) => {
  // Defining the Font Key in a separate variable, so we can type it for the index of the Object
  // We need to cast `fontFamily` to `FontName`, as the fontFamily type is coming from the `TextStyle`, 
  // which has no relation to our `FontName`
  const fontKey: FontKey<FontName> = `${fontFamily as FontName}.${fontStyle}.${fontWeight}`;
  // Get the actual font from the fonts Object matching the key, or use a fallback
  const fontFaceFamily = fontFace[fontKey] || fontFace['Roboto.normal.400'];

  return <Text style={{ fontFamily: fontFaceFamily, ...style }}>{children}</Text>;
};

export default Txt;
```

**NOTE:** You could also consider adding the font props as separate props, instead of destructuring them from `style` prop.

#### 3. Done! Now use the text component ☺️

Now the Component will dynamically select which font file to use, when displaying that font.

##### `components/screen/home.tsx`

```tsx
import Txt from 'components/text';

const Home = () => {
  return (
    <View>
      <Txt style={{ fontWeight: 600 }}>I will be bold</Txt>
      <Txt style={{ fontWeight: 400 }}>I will be regular</Txt>
      <Txt style={{ fontStyle: 'italic' }}>I will be italic</Txt>
    </View>
  );
};
```
