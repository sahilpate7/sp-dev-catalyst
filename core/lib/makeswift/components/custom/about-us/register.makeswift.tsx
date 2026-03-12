'use client';

import { Image, Style, TextInput } from '@makeswift/runtime/controls';

import { runtime } from '~/lib/makeswift/runtime';

import AboutUs from "./about-us.makeswift";

runtime.registerComponent(AboutUs, {
  type: 'about-us',
  label: 'Custom/ About Us',
  props: {
    className: Style(),
    name: TextInput({ label: 'Heading', defaultValue: 'Heading goes here' }),
    text: TextInput({ label: 'Text', defaultValue: 'Enter text here' }),
    image: Image({
      label: 'Main Image',
      format: Image.Format.WithDimensions,
    }),
  },
});
