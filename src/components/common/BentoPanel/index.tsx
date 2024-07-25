import React from 'react';
import Image from 'next/image';
import Link, { LinkProps } from 'next/link';

interface VisualLinkProps {
  svgPath: string;
}

interface BentoPanelProps {
  background?: {
    color?: string;
    image?: string;
  };
  title?: string;
  text?: string;
  links?: (LinkProps & VisualLinkProps)[];
  className?: string;
}

const Links = ({ links }: BentoPanelProps) =>
  links && (
    <ul className="bg-primary max-lg:flex-row rounded-full max-lg:h-[4.0625rem] max-lg:w-[19.25rem] lg:w-[4.375rem] lg:h-[14.9375rem] flex justify-evenly items-center flex-col">
      {links.map(({ svgPath, ...rest }, index) => (
        <li key={index} className="relative w-10 h-10">
          <Link {...rest}>
            <Image fill src={svgPath} alt={`icon for ${rest.href}`} />
          </Link>
        </li>
      ))}
    </ul>
  );

const Box = ({ title, text, background, links }: BentoPanelProps) => (
  <>
    <div className="relative rounded-2xl w-full h-full">
      <Image
        fill
        src="/bg-placeholder.jpg"
        alt={''}
        className="rounded-2xl"
        style={{ objectFit: 'cover' }}
      />
      <div className="px-[2.6875rem] py-[1.3125rem] w-full flex justify-between items-center h-full backdrop-brightness-[0.25]">
        {/* Texts */}
        <div className="lg:h-full lg:w-2/3 flex justify-around flex-col">
          <div className="font-bold text-6xl">{title}</div>
          <div className="font-semibold">{text}</div>
        </div>

        {/* Links */}
        <div className="max-lg:absolute right-0 -bottom-[3.125rem]">
          <Links links={links} />
        </div>
      </div>
    </div>
  </>
);

const BentoPanel = ({ title, text, links, background }: BentoPanelProps) => {
  return (
    <section className="relative text-white flex justify-between items-center p-0 max-lg:mt-32 w-full h-[21.375rem] max-lg:h-full">
      {/* Box */}
      <Box text={text} title={title} links={links} background={background} />
    </section>
  );
};

export default BentoPanel;
