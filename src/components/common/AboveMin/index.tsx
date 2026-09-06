'use client';

import Image from 'next/image';
import { useState } from 'react';
import React from 'react';
import { ImageBG, Nav } from '../Above';
import { SlideNav, Above as AboveMotion } from '../Above/motion';

const Content = ({ title }: { title: string }) => (
  <div
    id="content"
    className="text-white w-full pb-6 pt-2 internal-tablet:pb-8 internal-tablet:pt-4">
    <div className="w-[90%] max-w-[1024px] mx-auto flex flex-row justify-between items-center gap-3">
      <h1 className="text-2xl max-[320px]:text-xl internal-tablet:text-5xl font-bold font-space-grotesk text-left break-words flex-1 min-w-0 pr-2">
        {title}
      </h1>

      <div id="img-me" className="flex justify-end items-center flex-shrink-0">
        <div className="w-16 h-16 max-[320px]:w-14 max-[320px]:h-14 internal-tablet:w-28 internal-tablet:h-28 relative">
          <Image
            src="https://media.starlightcms.io/workspaces/foln/folndev/original/me-drawpng-igv3cmob9t.png"
            alt="me draw"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  </div>
);

const AboveMin = ({ title }: { title: string }) => {
  const [second, setSecond] = useState(false);

  return (
    <>
      <AboveMotion
        onEnter={() => setSecond(false)}
        onLeave={() => setSecond(true)}
        className="overflow-hidden w-full flex justify-center items-center">
        <div
          id="above"
          className="relative overflow-hidden pt-4 rounded-b-3xl w-full max-w-[1280px]">
          <div className="w-[90%] max-w-[1024px] mx-auto">
            <Nav />
          </div>
          <Content title={title} />
          <ImageBG />
        </div>
      </AboveMotion>

      {second && (
        <SlideNav direction="left" className="fixed bg-tertiary w-full z-50 top-0 shadow-lg">
          <div className="w-[90%] max-w-[1024px] mx-auto">
            <Nav />
          </div>
        </SlideNav>
      )}
    </>
  );
};

export default AboveMin;
