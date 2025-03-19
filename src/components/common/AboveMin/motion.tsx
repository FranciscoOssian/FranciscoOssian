'use client';

import React from 'react';
import useDynamicLib from '@/services/DynamicLib/useDynamicLib';
import { HTMLMotionProps } from 'motion/react';

type SlideProps = {
  direction: 'left' | 'right';
  children: React.ReactNode;
  className: string;
} & HTMLMotionProps<'div'>;

export const Slide = ({ direction, children, className, ...rest }: SlideProps) => {
  const initialX = direction === 'left' ? '100%' : '-100%';
  const animateX = '0%';

  const motionLib = useDynamicLib(import('motion/react'));

  if (!motionLib) return <div>{children}</div>;

  return (
    <motionLib.motion.div
      {...rest}
      className={className}
      initial={{ x: initialX, opacity: 0 }}
      animate={{ x: animateX, opacity: 1 }}
      exit={{ x: initialX, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 70 }}>
      {children}
    </motionLib.motion.div>
  );
};

export const SlideNav = ({ direction, children, className, ...rest }: SlideProps) => {
  const initialY = direction === 'left' ? '100%' : '-100%';
  const animateY = '0%';

  const motionLib = useDynamicLib(import('motion/react'));

  if (!motionLib) return <div>{children}</div>;

  return (
    <motionLib.motion.div
      {...rest}
      className={className}
      initial={{ y: initialY, opacity: 0 }}
      animate={{ y: animateY, opacity: 1 }}
      exit={{ y: initialY, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 70 }}>
      {children}
    </motionLib.motion.div>
  );
};

export const ButtonMotion = ({ children }: any) => {
  const motionLib = useDynamicLib(import('motion/react'));

  if (!motionLib) return <>{children}</>;
  return (
    <motionLib.motion.div whileHover={{ scale: 1.01, rotate: 1 }}>{children}</motionLib.motion.div>
  );
};

export const Above = ({ children, className, onLeave, onEnter }: any) => {
  const motionLib = useDynamicLib(import('motion/react'));
  if (!motionLib) return <div className={className}>{children}</div>;

  return (
    <motionLib.motion.div className={className} onViewportEnter={onEnter} onViewportLeave={onLeave}>
      {children}
    </motionLib.motion.div>
  );
};
