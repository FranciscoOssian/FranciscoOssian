'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { InternalLayout } from '../InternalLayout';

const Logo = () => (
  <div className="relative w-[220px] max-internal-phone:w-[180px] h-[26px]">
    <Link href="/">
      <Image
        src="/Franciscossian.svg"
        fill
        alt="francisco ossian"
        className="object-contain object-left"
      />
    </Link>
  </div>
);

export const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav id="top" className="top-0 flex items-center justify-between w-full my-4 z-40 relative">
      <Logo />

      <div className="hidden internal-tablet:flex text-secondary text-xl font-bold gap-6 font-space-grotesk">
        <Link href="/blog" className="hover:text-primary transition-colors">
          Blog
        </Link>
        <Link href="#projetos" className="hover:text-primary transition-colors">
          Work
        </Link>
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
      </div>

      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="internal-tablet:hidden bg-primary text-tertiary font-bold text-sm px-5 py-1.5 rounded-full hover:bg-secondary transition-colors"
        aria-label="Abrir menu">
        Menu
      </button>

      <div
        className={`fixed inset-0 bg-tertiary z-50 flex flex-col justify-between p-6 transition-transform duration-300 ease-in-out internal-tablet:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
        <div className="flex items-center justify-between w-full">
          <Logo />
          <button
            type="button"
            onClick={closeMenu}
            className="text-white p-2 rounded-full hover:bg-white/10 transition-colors focus:outline-none"
            aria-label="Fechar menu">
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col items-center justify-center gap-8 text-2xl font-bold text-secondary font-space-grotesk">
          <Link
            href="/blog"
            onClick={closeMenu}
            className="hover:text-primary transition-colors text-center w-full py-2">
            Blog
          </Link>
          <Link
            href="#projetos"
            onClick={closeMenu}
            className="hover:text-primary transition-colors text-center w-full py-2">
            Work
          </Link>
          <Link
            href="/"
            onClick={closeMenu}
            className="hover:text-primary transition-colors text-center w-full py-2">
            Home
          </Link>
        </div>

        <div className="h-10" />
      </div>
    </nav>
  );
};

const Content = ({ link }: { link: string }) => (
  <div className="text-white">
    <div className="flex flex-col justify-between h-max gap-5">
      <h1 className="text-6xl leading-none max-internal-tablet:text-4xl max-internal-phone:leading-10 max-[320px]:text-2xl max-[320px]:leading-8 font-bold text-primary">
        <span className="text-secondary">Eleve seu negócio a outro nível</span> com um full stack de
        qualidade
      </h1>

      <p className="leading-[24px] font-light flex items-center">
        Desenvolvendo ideias e criando soluções. Eu crio soluções, desenvolvo e dou manutenção.
      </p>

      <p className="font-bold">Front-End | Back-End | Mobile | Cloud | Automações</p>

      <Link href={link}>
        <button className="text-xs w-[392px] max-w-full max-internal-phone:w-full h-[44px] pl-5 pr-1 flex justify-between max-internal-phone:justify-end max-internal-phone:gap-1 items-center base-button font-bold">
          Fale comigo agora no WhatsApp
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20.0001 0C8.97227 0 0.000129063 8.97217 0.000129063 20C0.000129063 23.4435 0.889691 26.8296 2.57664 29.8174L0.0323028 38.8956C-0.0511752 39.1939 0.0296942 39.5139 0.245346 39.7356C0.411432 39.907 0.637518 40 0.869691 40C0.939256 40 1.00969 39.9913 1.07839 39.9748L10.5531 37.6278C13.4462 39.1809 16.7044 40 20.0001 40C31.0279 40 40 31.0278 40 20C40 8.97217 31.0279 0 20.0001 0ZM30.0609 27.0574C29.6331 28.2417 27.5809 29.3226 26.5948 29.4678C25.7096 29.5974 24.5896 29.653 23.3601 29.267C22.6148 29.0322 21.6583 28.7209 20.4331 28.1983C15.2827 26.0017 11.9192 20.8809 11.6618 20.5426C11.4053 20.2043 9.56532 17.7939 9.56532 15.2991C9.56532 12.8043 10.8914 11.5774 11.3627 11.0696C11.834 10.5617 12.3897 10.4348 12.7323 10.4348C13.0749 10.4348 13.4166 10.4391 13.7166 10.453C14.0323 10.4687 14.4557 10.3339 14.8723 11.3235C15.3001 12.3391 16.327 14.8339 16.454 15.0887C16.5827 15.3426 16.6679 15.6391 16.4975 15.9774C16.327 16.3157 16.2418 16.527 15.9844 16.8235C15.727 17.12 15.4453 17.4843 15.214 17.7122C14.9566 17.9652 14.6896 18.2391 14.9888 18.747C15.2879 19.2548 16.3183 20.9148 17.8453 22.2591C19.8062 23.9861 21.4609 24.5217 21.974 24.7757C22.487 25.0296 22.787 24.987 23.0861 24.6487C23.3853 24.3096 24.3696 23.1678 24.7114 22.6609C25.0531 22.1539 25.3957 22.2374 25.867 22.407C26.3383 22.5757 28.8626 23.8017 29.3757 24.0557C29.8887 24.3096 30.2313 24.4365 30.36 24.6478C30.4887 24.8583 30.4887 25.8739 30.0609 27.0574Z"
              fill="black"
            />
          </svg>
        </button>
      </Link>
    </div>
  </div>
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
  return (
    <div>
      <div className="z-50 w-full">
        <div
          id="above"
          className="relative rounded-b-3xl overflow-hidden pb-9 max-internal-phone:pb-3">
          <ImageBG />
          <InternalLayout className="flex items-center flex-col h-full">
            <Nav />
            <div className="mt-11 max-internal-tablet:mt-3 max-internal-phone:mt-1 w-full flex justify-start">
              <div className="max-w-[583px] min-w-[261px] w-full">
                <Content link={link} />
              </div>
            </div>
          </InternalLayout>
        </div>
      </div>
      <div className="hidden h-[569px] max-internal-phone:h-[480px] max-[320px]:h-[364px]"></div>
    </div>
  );
};

export default Above;
