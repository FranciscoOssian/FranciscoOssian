import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode[] | ReactNode;
  className?: string;
}

const PageFrame: React.FC<Props> = ({ children, className }) => {
  return (
    <div className={`w-[100vw] flex justify-center items-center ${className}`}>
      <div className="max-w-[61.81rem] w-[100%] mx-8">{children}</div>
    </div>
  );
};

export default PageFrame;
