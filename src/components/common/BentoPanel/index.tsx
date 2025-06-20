import React from 'react';
import Image from 'next/image';
import Link, { LinkProps } from 'next/link';

interface VisualLinkProps {
  svgPath: string;
}

interface BentoPanelProps {
  title?: string;
  text?: string;
  links?: (LinkProps & VisualLinkProps)[];
  className?: string;
}

const Links = ({ links }: BentoPanelProps) =>
  links && (
    <ul className="text-white border border-primary bg-tertiary rounded-full flex justify-evenly items-center w-80 max-internal-phone:w-full max-internal-phone:mt-2 h-16">
      {links.map(({ svgPath, ...rest }, index) => (
        <li key={index} className="relative w-10 h-10">
          <Link {...rest}>
            <Image className="invert" fill src={svgPath} alt={`icon for ${rest.href}`} />
          </Link>
        </li>
      ))}
    </ul>
  );

const Box = ({ title, text, links }: BentoPanelProps) => (
  <>
    <div className="relative border border-t-0 border-r-0 max-internal-phone:border-none border-primary max-h-36 max-internal-tablet:max-h-fit max-internal-phone:max-h-fit text-white w-full rounded-2xl px-[2.6875rem] max-internal-phone:p-0">
      {/* Texts */}
      <div>
        <div className="font-bold max-internal-phone:text-right text-6xl max-internal-phone:text-2xl text-secondary uppercase w-full">
          {title}
        </div>
        <div className="font-light leading-5 w-[75%] mb-7">{text}</div>
      </div>
      {/* Links */}
      <div className="absolute max-internal-phone:relative right-0 -bottom-[22%]">
        <Links links={links} />
      </div>
    </div>
  </>
);

const BentoPanel = ({ title, text, links }: BentoPanelProps) => {
  return (
    <section>
      <Box text={text} title={title} links={links} />
    </section>
  );
};

export default BentoPanel;
