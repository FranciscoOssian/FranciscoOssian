'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';

const Tag = ({ label }: { label: string }) => {
  return (
    <span className="h-fit break-keep text-nowrap text-white bg-black text-center rounded-xl py-[4px] px-[6px] text-sm font-medium">
      {label}
    </span>
  );
};

const Project = ({ project, selected }: { project: itemType; selected: boolean }) => {
  return (
    <div
      data-selected={selected}
      className="flex flex-col justify-center pl-8 gap-2 font-bold data-[selected=true]:bg-primary cursor-pointer transition bg-[#D9D9D9] rounded-xl rounded-tr-none w-full h-24 overflow-hidden">
      <div className="flex items-center gap-3">
        <div className="size-8 relative rounded-full bg-white overflow-hidden">
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
    <div className="w-[594px] max-lg:w-full max-lg:mt-10 relative">
      <div
        style={{
          background: '#D9D9D9',
          backgroundImage:
            'linear-gradient(45deg,rgba(255, 255, 255, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%)',
        }}
        className="w-full h-fit rounded-xl p-6 flex flex-col gap-8">
        <div className="flex flex-col gap-8 w-[65%] max-lg:w-full leading-[111%]">
          <div className="flex justify-between max-lg:w-[70%]">
            <div className="text-2xl uppercase font-bold text-[#373737]">{project.title}</div>
            <button className="font-bold base-button hover:!bg-primary w-40 max-lg:w-32 flex justify-center items-center gap-3">
              <ArrowTopRightOnSquareIcon className="size-6" />
              ver mais
            </button>
          </div>
          <div>{project.subtitle}</div>
        </div>
        <div className="flex max-lg:flex-wrap">
          <div className="w-96 h-48 relative overflow-hidden border rounded-3xl">
            <Image src={project?.image ?? ''} alt={project?.title + '/media'} fill />
          </div>
          <div className="flex justify-center items-center w-36 max-lg:w-full max-lg:mt-9">
            <div className="flex flex-wrap justify-end items-center gap-3 h-fit">
              {project?.tags && project?.tags.map((tag, i) => <Tag key={i} label={tag} />)}
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          background: 'rgba(0,0,0,0.2)',
          border: '1px solid rgba(255, 255, 255, 0.26)',
          backgroundImage:
            'linear-gradient(45deg,rgba(151, 151, 151, 0.25) 0%, rgba(49, 49, 49, 1) 100%)',
        }}
        className="absolute size-52 max-lg:size-28 -top-8 -right-8 max-lg:-right-0  overflow-hidden rounded-xl">
        <div className="relative w-full h-full ">
          <Image src={project?.icon ?? ''} alt={project?.title + '/media-icon'} fill />
        </div>
      </div>
    </div>
  );
};

const Projects = ({ list }: { list: itemType[] }) => {
  const [selected, setSelected] = useState<itemType>(list[0]);
  return (
    <div className="flex gap-2">
      <ul className="w-96 flex flex-col gap-4">
        {list.map((project, i) => (
          <li key={i} onClick={() => setSelected(project)}>
            <Project selected={project.title === selected?.title} project={project} />
            <div className={selected.title === project.title ? 'hidden max-lg:block' : 'hidden'}>
              <Detail project={selected} />
            </div>
          </li>
        ))}
      </ul>
      <div className="max-lg:hidden">
        <Detail project={selected} />
      </div>
    </div>
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
