import React from 'react';

import styles from './styles.module.scss';

export default function PageContainer({ children }: { children: JSX.Element | JSX.Element[] }) {
  return (
    <div className={styles.PageContainer}>
      <div>{children}</div>
    </div>
  );
}
