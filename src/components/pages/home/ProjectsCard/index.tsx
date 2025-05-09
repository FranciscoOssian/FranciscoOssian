'use client';

import Card from '@/components/common/Card';
import dynamic from 'next/dynamic';

import useDynamicLib from '@/services/DynamicLib/useDynamicLib';
import { useState } from 'react';

const Video = dynamic(() => import('@/components/common/Video'));

const ProjectsCard = ({ list }: { list: itemType[] }) => {
  const motionLib = useDynamicLib(import('motion/react'));
  const [video, setVideo] = useState<{ src: string; playing: boolean }>({
    src: '',
    playing: false,
  });

  if (!motionLib)
    return (
      <div className="flex flex-wrap w-full justify-center items-center">
        {list.map((projeto, i) => {
          return (
            <div key={i}>
              <div className="m-4">
                <Card {...projeto} />
              </div>
            </div>
          );
        })}
      </div>
    );

  return (
    <div>
      <div className="flex flex-wrap w-full justify-center items-center">
        {list.map((projeto, i) => {
          return (
            <motionLib.motion.div
              onTouchStartCapture={() => setVideo({ src: projeto.videoUrl ?? '', playing: true })}
              onTouchEndCapture={() => setVideo((prev) => ({ ...prev, playing: false }))}
              onMouseLeave={() => setVideo((prev) => ({ ...prev, playing: false }))}
              onMouseEnter={() => setVideo({ src: projeto.videoUrl ?? '', playing: true })}
              key={`${i}-${projeto.titleText}`}
              className="m-4">
              <Card {...projeto} />
            </motionLib.motion.div>
          );
        })}
      </div>
      <motionLib.AnimatePresence>
        {video.playing && video.src && (
          <motionLib.motion.div
            initial={{ x: 100, opacity: 0 }}
            exit={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            whileDrag={{ scale: 1.2 }}
            transition={{
              type: 'spring',
              damping: 10,
              stiffness: 100,
            }}
            drag
            dragConstraints={{
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
            className="flex flex-col items-end bg-red fixed top-7 right-0">
            <Video src={video.src} isPlaying={video.playing} />
            <motionLib.motion.svg
              whileHover={{ scale: 1.2 }}
              onClick={() => setVideo((prev) => ({ ...prev, playing: false }))}
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-11">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </motionLib.motion.svg>
          </motionLib.motion.div>
        )}
      </motionLib.AnimatePresence>
    </div>
  );
};

type itemType = {
  headerText: string;
  media: string;
  subHeaderText: string;
  videoUrl?: string;
  titleText: string;
  subTitleText: string;
  supportingText: string;
};

export default ProjectsCard;
