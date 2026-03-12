'use client';

import { forwardRef, Ref } from 'react';

import { Image } from '~/components/image';

interface Props {
  className?: string;
  image?: {
    url: string;
    dimensions: {
      width: number;
      height: number;
    };
  };
  name: string;
  text: string;
}

const AboutUs = forwardRef(({ className, image, name, text }: Props, ref: Ref<HTMLDivElement>) => {
  return (
    <div className={className} ref={ref}>
      <h1>{name}</h1>
      <p>{text}</p>
      <Image
        alt={name}
        height={image?.dimensions.height || 400}
        src={image?.url || '/photo.png'}
        width={image?.dimensions.width || 600}
      />
    </div>
  );
});

export default AboutUs;
