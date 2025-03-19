'use client';

import useDynamicLib from '@/services/DynamicLib/useDynamicLib';

export const SectionSlide = ({ children, className, id }: any) => {
  const motionLib = useDynamicLib(import('motion/react'));

  if (!motionLib)
    return (
      <div id={id} className={className}>
        {children}
      </div>
    );
  return (
    <motionLib.motion.div
      id={id}
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}>
      {children}
    </motionLib.motion.div>
  );
};
