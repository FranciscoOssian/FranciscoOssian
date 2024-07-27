'use client';

import Image from 'next/image';
import useDynamicLib from '@/services/DynamicLib/useDynamicLib';

interface CardProps {
  headerText: string;
  subHeaderText: string;
  titleText: string;
  subTitleText: string;
  supportingText: string;
  media?: string;
}

const Card = ({
  headerText,
  subHeaderText,
  titleText,
  subTitleText,
  supportingText,
  media,
}: CardProps) => {
  const Header = () => (
    <div id="header" className="w-full">
      <p className="uppercase text-xs font-bold">{headerText}</p>
      <small className="text-gray-400">{subHeaderText}</small>
      <h4 className="text-xl font-bold mt-1">{titleText}</h4>
    </div>
  );

  let Content = () => (
    <div className="size-52 flex flex-col justify-center items-center gap-2 p-4">
      <Header />
      {media && (
        <div
          id="media"
          className="bg-white shadow-[0_12px_15px_rgba(0,0,0,0.1)] relative size-44 aspect-[270/177] rounded-2xl overflow-hidden">
          <Image src={media} alt={`${headerText} media`} style={{ objectFit: 'cover' }} fill />
        </div>
      )}
    </div>
  );

  const motionLib = useDynamicLib(import('framer-motion'));

  if (!motionLib)
    return (
      <div className="relative size-52">
        <div className="overflow-hidden rounded-xl text-white bg-[#18181B] py-2">
          <Content />
        </div>
      </div>
    );

  return (
    <div className="hover:border-gray-900 border-2 rounded-3xl transition-all relative size-52">
      <div className="overflow-hidden rounded-xl text-white py-2">
        <Content />
      </div>
    </div>
  );
};
export default Card;
