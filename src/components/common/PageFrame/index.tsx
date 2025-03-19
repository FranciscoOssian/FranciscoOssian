import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode[] | ReactNode;
  className?: string;
}

const PageFrame: React.FC<Props> = ({ children, className }) => {
  return (
    <div className={`w-svw flex justify-center items-center ${className}`}>
      <div className={`max-w-[61.81rem] w-svw mx-8 ${className}`}>{children}</div>
    </div>
  );
};

export default PageFrame;
