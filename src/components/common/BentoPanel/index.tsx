import React, { FC } from "react";
import Image from "next/image";
import Link, { LinkProps } from "next/link";

interface VisualLinkProps {
  svgPath: string;
}

interface BentoPanelProps {
  image?: string;
  background?: {
    color?: string;
    image?: string;
  };
  title?: string;
  text?: string;
  links?: (LinkProps & VisualLinkProps)[];
  className?: string;
}

const Picture = ({ image }: BentoPanelProps) => (
  <div className="rounded-full relative max-lg:w-[10rem] lg:w-64 max-lg:h-[10rem] lg:h-64 overflow-hidden bg-white">
    {image && <Image src={image} alt="Profile" fill />}
  </div>
);

const Links = ({ links }: BentoPanelProps) =>
  links && (
    <ul className="bg-primary max-lg:flex-row rounded-full max-lg:h-[4.0625rem] max-lg:w-[19.25rem] lg:w-[4.375rem] lg:h-[14.9375rem] flex justify-evenly items-center flex-col">
      {links.map((link, index) => (
        <li key={index} className="relative w-10 h-10">
          <Link {...link}>
            <Image fill src={link.svgPath} alt={`icon for ${link.href}`} />
          </Link>
        </li>
      ))}
    </ul>
  );

const Box = ({ title, text, background, links, image }: BentoPanelProps) => (
  <>
    <div className="relative rounded-2xl lg:w-[45.437rem] h-full">
      <Image
        fill
        src="/bg-placeholder.jpg"
        alt={""}
        className="rounded-2xl"
        style={{ objectFit: "cover" }}
      />
      <div className="px-[2.6875rem] py-[1.3125rem] w-full flex justify-between items-center h-full backdrop-brightness-[0.25]">
        {/* Texts */}
        <div className="lg:h-full lg:w-2/3 flex justify-around flex-col">
          <div className="max-lg:-translate-y-20 flex -mb-[2.5rem] flex-wrap items-end max-[21.5625rem]:justify-center justify-between font-bold text-6xl">
            <div className="lg:hidden">
              <Picture image={image} />
            </div>
            {title}
          </div>
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

const BentoPanel = ({
  image,
  title,
  text,
  links,
  background,
}: BentoPanelProps) => {
  return (
    <section className="relative text-white flex justify-between items-center p-0 max-lg:mt-32 w-full h-[21.375rem] max-lg:h-full">
      {/* Pic */}
      <div className="max-lg:hidden">
        <Picture image={image} />
      </div>
      {/* Box */}
      <Box
        image={image}
        text={text}
        title={title}
        links={links}
        background={background}
      />
    </section>
  );
};

export default BentoPanel;
