'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';
import { AnimatePresence, motion } from 'motion/react';

const Tag = ({ label, index }: { label: string; index: number }) => {
  return (
    <motion.span
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3, type: 'tween', delay: index * 0.1 }}
      className="h-fit break-keep text-nowrap text-white bg-black text-center rounded-xl py-[4px] px-[6px] text-sm font-medium">
      {label}
    </motion.span>
  );
};

const Project = ({ project, selected }: { project: itemType; selected: boolean }) => {
  return (
    <div
      data-selected={selected}
      className="flex flex-col justify-center pl-8 gap-2 font-bold data-[selected=true]:bg-primary cursor-pointer transition bg-[#D9D9D9] rounded-xl rounded-tr-none w-full h-24 overflow-hidden">
      <div className="flex items-center gap-3">
        <div className="size-8 relative rounded-full bg-white overflow-hidden max-[320px]:hidden">
          <Image fill src={project.icon ?? ''} alt={project.title + '/project-icon'} />
        </div>
        <div>
          {project.title}{' '}
          <span data-selected={selected} className="data-[selected=false]:text-[#717171]">
            • {project.involvement} {project?.context && '•'} {project.context}
          </span>
        </div>
      </div>
      <div className="text-[12px]">{project.category}</div>
    </div>
  );
};

const Detail = ({ project }: { project: itemType }) => {
  return (
    <div className="max-w-[594px] w-full max-lg:mt-10 relative">
      <div
        style={{
          background: '#D9D9D9',
          backgroundImage:
            'linear-gradient(45deg,rgba(255, 255, 255, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%)',
        }}
        className="w-full h-fit rounded-xl p-6 max-[320px]:pt-2 flex flex-col gap-8">
        <div className="flex flex-col gap-8 w-[65%] max-lg:w-full leading-[111%]">
          <div className="flex justify-between items-end flex-wrap max-lg:w-[70%]">
            <div className="text-2xl uppercase font-bold text-tertiary">{project.title}</div>
            <button className="font-bold base-button hover:!bg-primary w-40 max-lg:w-32 flex justify-center items-center gap-3">
              <ArrowTopRightOnSquareIcon className="size-6" />
              ver mais
            </button>
          </div>
          <div>{project.subtitle}</div>
        </div>
        <div className="flex max-lg:flex-wrap">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="w-96 h-48 relative overflow-hidden rounded-3xl max-internal-tablet:hidden">
            {project?.image && (
              <Image src={project?.image ?? ''} alt={project?.title + '/media'} fill />
            )}
          </motion.div>
          <div className="flex justify-start items-center w-40 max-lg:w-full max-lg:mt-9 max-internal-tablet:m-0">
            <div className="flex flex-wrap justify-end items-center gap-3 h-fit">
              {project?.tags &&
                project?.tags.map((tag, i) => <Tag index={i} key={i} label={tag} />)}
            </div>
          </div>
        </div>
      </div>
      <motion.div
        key={project.title}
        initial={{ x: 50 }}
        animate={{ x: 10 }}
        exit={{ x: 50 }}
        transition={{ duration: 0.5, type: 'tween' }}
        style={{
          background: 'rgba(0,0,0,0.2)',
          border: '1px solid hsla(0, 0%, 100%, 0.26)',
          backgroundImage:
            'linear-gradient(45deg,rgba(151, 151, 151, 0.25) 0%, rgba(49, 49, 49, 1) 100%)',
        }}
        className="absolute size-52 max-lg:size-24 max-[320px]:size-16 -top-8 max-[320px]:-top-2 -right-8 max-lg:-right-0 max-internal-phone:right-5  overflow-hidden rounded-xl">
        <div className="relative w-full h-full">
          <Image src={project?.icon ?? ''} alt={project?.title + '/media-icon'} fill />
        </div>
      </motion.div>
    </div>
  );
};

const Projects = ({ list }: { list: itemType[] }) => {
  const [selected, setSelected] = useState<itemType>(list[0]);
  return (
    <AnimatePresence mode="wait">
      <motion.div className="w-full flex gap-2 justify-start items-start">
        <ul className="w-full flex flex-col gap-4">
          {list.map((project) => (
            <li key={project.title}>
              <div
                className="w-full text-left"
                onKeyDown={() => setSelected(project)}
                onClick={() => setSelected(project)}>
                <Project selected={project.title === selected?.title} project={project} />
                <AnimatePresence>
                  {project.title === selected.title && (
                    <motion.div
                      className="hidden max-internal-phone:block overflow-hidden"
                      key={selected.title}
                      initial={{ opacity: 0, y: 50, height: '1px' }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={{ opacity: 0, y: 50, height: '1px' }}
                      transition={{ duration: 0.3 }}>
                      <Detail project={selected} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </li>
          ))}
        </ul>
        <div className="max-internal-phone:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.title}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}>
              <Detail project={selected} />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export type itemType = Partial<{
  context: string;
  involvement: string;
  category: string;
  title: string;
  subtitle: string;
  tags: string[];
  image: string;
  icon: string;
}>;

export default Projects;
