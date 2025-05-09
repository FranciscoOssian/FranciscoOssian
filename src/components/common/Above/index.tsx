'use client';

import Image from 'next/image';
import { Above as AboveMotion, SlideNav } from './motion';
import { useState } from 'react';
import React from 'react';
import Link from 'next/link';
import { InternalLayout } from '../InternalLayout';

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

const Content = ({ link }: { link: string }) => (
  <InternalLayout className="flex flex-col justify-center h-full text-white">
    <div className="w-full max-tablet:max-w-[100%] max-w-[60%] flex flex-col gap-2">
      <h1 className="text-6xl max-sm:text-4xl leading-[60px] font-bold w] mkin-w-[700px] text-primary">
        <span className="text-secondary">Eleve seu negócio a outro nível</span> com um full stack de
        qualidade
      </h1>

      <p className="leading-[24px] font-light flex items-center">
        Desenvolvendo ideias e criando soluções. Eu crio soluções, desenvolvo e dou manutenção.
      </p>

      <p className="font-bold">Front-End | Back-End | Mobile | Cloud | Automações</p>

      <Link href={link}>
        <button className="base-button font-bold px-14 py-3 mt-4">
          Entre em contato e inicie seu projeto hoje
        </button>
      </Link>
    </div>
  </InternalLayout>
);

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

const Above = ({ link }: { link: string }) => {
  const [second, setSecond] = useState(false);
  return (
    <>
      <AboveMotion
        onEnter={() => setSecond(false)}
        onLeave={() => setSecond(true)}
        className="w-svw flex justify-center items-center">
        <div
          id="above"
          className="relative overflow-hidden pt-10 rounded-b-3xl h-[60svh] max-h-[700px] min-h-[550px] max-xl:w-full w-[1280px]">
          <Nav />
          <Content link={link} />
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
