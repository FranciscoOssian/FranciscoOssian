'use client';

import { motion, useInView } from 'motion/react';
import { useEffect, useRef } from 'react';
import styles from './picture.styles.module.scss';

export const Picture = ({ image }: { image: { src: string } }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const father = useRef<HTMLDivElement>(null);
  const inView = useInView(father);

  useEffect(() => {
    fetch(image.src, { cache: 'force-cache' })
      .then((res) => res.text())
      .then((svg) => {
        if (containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      });
  }, [image.src]);

  return (
    <motion.div>
      <div
        ref={father}
        className="w-96 max-[377px]:w-full h-36 max-internal-phone:w-80 text-secondary">
        <div
          className={inView ? styles.svgContainerOpacityCard : styles.svgContainerOpacityCardEmpty}
          ref={containerRef}
        />
      </div>
    </motion.div>
  );
};
