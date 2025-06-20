import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { InternalLayout } from '../InternalLayout';

interface Item {
  src?: string;
  onClick?: () => void;
  href?: string;
}

interface UlComponentProps {
  items: (string | Item)[];
  className: string;
}

const UlComponent: React.FC<UlComponentProps> = ({ items, className }) => (
  <ul
    className={`max-xl:w-[173px] ${
      typeof items?.[0] === 'string' ? 'w-[216px]' : '!flex-row'
    } ${className} isolate`}>
    {items.map((item, i) => (
      <li
        className={`${typeof items?.[0] === 'string' ? 'max-xl:w-[155px] w-[198px]' : ''} `}
        key={i}>
        {typeof item === 'string' ? (
          item
        ) : item.href ? (
          <Link href={item.href}>
            <div className="relative size-8 text-black">
              <Image
                src={item.src ?? ''}
                alt={item.src ?? 'social media icon'}
                style={{ objectFit: 'cover' }}
                fill
              />
            </div>
          </Link>
        ) : (
          <button onClick={item.onClick}>{item.src || 'Button'}</button>
        )}
      </li>
    ))}
  </ul>
);

const Footer = ({
  card,
  browse,
  services,
  contact,
}: {
  card: { image: string; title: string; text: string };
  browse: string[];
  services: string[];
  contact: { src: string; onClick?: () => void; href?: string }[];
}) => {
  const sections = [
    { title: 'Serviços', items: services },
    { title: 'Navegar', items: browse },
    { title: 'Contato', items: contact },
  ];

  return (
    <div className="w-full flex justify-center items-center">
      <div className="bg-white min-w-[100%] rounded-t-2xl pt-11">
        <InternalLayout className="flex flex-wrap justify-between items-start pb-3 max-xl:gap-5">
          <div
            id="card"
            className="h-80 max-phone:h-fit max-xl:w-[173px] w-[216px] max-internal-phone:w-[45%] gap-3 flex flex-col bg-[#EDEDED] rounded-2xl px-2 py-4 shadow-[-2px_7px_47.4px_-3px_rgba(0,0,0,0.25)]">
            <div id="image" className="flex justify-center items-center">
              <div className="max-phone:hidden overflow-hidden w-[198px] max-md:h-20 h-[155px] bg-black rounded-3xl flex justify-center items-center">
                <div className="relative size-44 max-md:size-20">
                  <Image
                    src="/me-draw.png"
                    alt="me profile picture draw"
                    style={{ objectFit: 'cover' }}
                    fill
                  />
                </div>
              </div>
            </div>
            <h3 className="font-bold">{card.title}</h3>
            <p>{card.text}</p>
          </div>
          {sections.map((section) => (
            <div className="max-internal-phone:w-[45%]" key={section.title}>
              <div className="font-bold">{section.title}</div>
              <UlComponent
                className={`
                ${
                  section.title === 'Contact' ? 'flex justify-between mt-2 flex-wrap gap-11' : ''
                } flex flex-col gap-1`}
                items={section.items}
              />
            </div>
          ))}
        </InternalLayout>
      </div>
    </div>
  );
};

export default Footer;
