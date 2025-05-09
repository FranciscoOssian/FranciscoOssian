'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

export const Pictures = ({ images }: { images: { src: string; alt?: string }[] }) => {
  //height: 17.625rem /* 282px */;

  const startRotate = -12;
  const endRotate = 12;
  const step = (Math.abs(startRotate) + endRotate) / images.length;
  const transforms = images.map((_, i) => {
    if (i === 0) return { angle: startRotate, y: 0 };
    const angle = startRotate + step * (i + 1);
    const y = 6 * step;
    return {
      angle,
      y,
    };
  });

  return (
    <div className="relative w-[23.3125rem] h-[17.625rem]">
      {images.map((img, i) => (
        <div key={i} className="absolute">
          <motion.div
            initial={{ rotate: transforms[i].angle, y: transforms[i].y }}
            whileHover={{ x: 30 }}
            className="relative overflow-hidden rounded-r-3xl w-[23.3125rem] h-[17.625rem]">
            <Image src={img.src} fill alt={img.alt || ''} />
          </motion.div>
        </div>
      ))}
      <motion.div
        initial={{ x: -30, y: -25 }}
        className="pointer-events-none w-[90%] h-[145%] absolute bg-gradient-to-r from-tertiary via-tertiary via-[20%] to-transparent"></motion.div>
    </div>
  );
};
