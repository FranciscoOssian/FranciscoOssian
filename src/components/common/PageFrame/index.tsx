import React, { ReactNode } from 'react';
import { InternalLayout } from '../InternalLayout';

interface Props {
  children: ReactNode[] | ReactNode;
  className?: string;
}

const PageFrame: React.FC<Props> = ({ children, className = '' }) => {
  return <InternalLayout className={className}>{children}</InternalLayout>;
};

export default PageFrame;
