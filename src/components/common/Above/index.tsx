'use client';

import Image from 'next/image';
import { ButtonMotion, Slide, Above as AboveMotion, SlideNav } from './motion';
import { useState } from 'react';
import React from 'react';
import Link from 'next/link';

export const Nav = () => {
  return (
    <div id="top" className="flex items-center justify-center w-full">
      <div className="max-w-[61.81rem] w-[100%] flex max-xl:justify-around justify-between items-center gap-4">
        <div className="relative w-[256px] h-[26px] max-sm:w-100px] max-sm:h-[25px]">
          <Link href="/">
            <Image src="/Franciscossian.svg" fill alt="francisco ossian" />
          </Link>
        </div>
        <div className="flex text-white text-xl font-bold gap-4 font-space-grotesk">
          <div>
            <Link href="/blog">Blog</Link>
          </div>
          <div>
            <Link href="#projetos">Work</Link>
          </div>
          <div>
            <Link href="/">Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const Content = () => (
  <div id="content" className="text-white flex flex-col justify-center items-center h-full">
    <div className="max-sm:text-5xl max-sm:mb-3 font-bold font-space-grotesk text-6xl leading-[82px] text-center break-all">
      Desenvolvedor
      <br /> fullstack
    </div>
    <div className="leading-5 text-center">
      Desenvolvendo ideias e criando soluções.
      <br />
      Eu crio soluções, desenvolvo e dou manutenção.
      <br />
      <br />
    </div>
    <div className="font-black text-center">Front-End | Back-End | Mobile | Cloud | Automações</div>
    <ButtonMotion>
      <Link href="https://api.whatsapp.com/send/?phone=558592048568&text&type=phone_number&app_absent=0">
        <button className="base-button font-bold px-14 py-1 mt-4">
          Entre em contato e inicie seu projeto hoje
        </button>
      </Link>
    </ButtonMotion>
    <div className="size-40 max-xl:size-16"></div>
    <div id="img-me" className="absolute -bottom-4">
      <div className="max-[416px]:hidden max-sm:size-40 -z-[1] max-sm:translate-y-9 max-xl:size-64 size-48 relative">
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
  </div>
);

const Hands = () => {
  return (
    <div id="hands" className="max-[416px]:hidden">
      <Slide direction="right" className="absolute top-20 max-sm:top-16 -left-4 max-sm:-left-0">
        <div className="size-52 max-sm:size-14 relative">
          <Image
            src={
              'https://media.starlightcms.io/workspaces/foln/folndev/original/hand-write-apple-lrVt5ptraY.png'
            }
            className="scale-x-[-1]"
            alt="emoji-hand"
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 640px) 14vw, 52vw"
          />
        </div>
      </Slide>
      <Slide direction="left" className="absolute top-20 max-sm:top-16 -right-4 max-sm:-right-0">
        <div className="size-52 max-sm:size-14 relative">
          <Image
            src={
              'https://media.starlightcms.io/workspaces/foln/folndev/original/hand-write-apple-lrVt5ptraY.png'
            }
            className=""
            alt="emoji-hand"
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 640px) 14vw, 52vw"
          />
        </div>
      </Slide>
    </div>
  );
};

export const ImageBG = () => (
  <Image
    src={'https://media.starlightcms.io/workspaces/foln/folndev/original/bgjpg-874pe8uqj4.jpg'}
    fill
    alt=""
    priority
    style={{
      zIndex: -10,
      objectFit: 'cover',
    }}
  />
);

const Above = () => {
  const [second, setSecond] = useState(false);
  return (
    <>
      <AboveMotion
        onEnter={() => setSecond(false)}
        onLeave={() => setSecond(true)}
        className="overflow-hidden w-svw flex justify-center items-center">
        <div
          id="above"
          className="relative overflow-hidden pt-10 rounded-b-3xl max-xl:h-[788px] max-sm:h-[450px] h-[600px] max-xl:w-full w-[1280px]">
          <Nav />
          <Content />
          <Hands />
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
