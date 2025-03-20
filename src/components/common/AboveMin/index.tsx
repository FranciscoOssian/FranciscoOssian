'use client';

import Image from 'next/image';
import { useState } from 'react';
import React from 'react';
import { ImageBG, Nav } from '../Above';
import { SlideNav, Above as AboveMotion } from '../Above/motion';

const InternalLayout = ({ children, className }: { children: any; className: string }) => {
  return (
    <div className="w-full flex justify-center">
      <div className={`w-[75%] ${className}`}>{children}</div>
    </div>
  );
};

const Content = ({ title }: { title: string }) => (
  <div id="content" className="text-white h-full">
    <InternalLayout className="flex justify-between items-center">
      <div className="max-sm:text-5xl max-sm:mb-3 font-bold font-space-grotesk text-2xl leading-[82px] text-center break-all">
        {title.substring(0, 70)}
      </div>
      <div id="img-me">
        <div className="size-24 relative">
          <Image
            src={
              'https://media.starlightcms.io/workspaces/foln/folndev/original/me-drawpng-igv3cmob9t.png'
            }
            alt="me draw"
            fill
            style={{ objectFit: 'cover' }}
            priority
            sizes="(max-width: 416px) 100vw, (max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>
      </div>
    </InternalLayout>
  </div>
);

const Above = ({ title }: { title: string }) => {
  const [second, setSecond] = useState(false);
  return (
    <>
      <AboveMotion
        onEnter={() => setSecond(false)}
        onLeave={() => setSecond(true)}
        className="overflow-hidden w-svw flex justify-center items-center">
        <div
          id="above"
          className="relative overflow-hidden pt-10 rounded-b-3xl max-xl:w-full w-[1280px]">
          <Nav />
          <Content title={title} />
          <ImageBG />
        </div>
      </AboveMotion>

      {second && (
        <SlideNav direction="left" className="fixed bg-black w-full z-50 top-0">
          <Nav />
        </SlideNav>
      )}
    </>
  );
};

export default Above;
