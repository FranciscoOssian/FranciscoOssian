'use client';

import Image from './Image';
import { usePathname } from 'next/navigation';

import styles from './styles.module.scss';

export default function Head() {
  const pathName = usePathname();
  return (
    <div className={styles.head}>
      <Image />
      <nav>
        <ul>
          {[
            ['/', 'Home'],
            ['/about', 'About'],
            ['/blog', 'Blog'],
            ['/projects', 'Projects'],
            ['/contact', 'Contact'],
          ].map((item) => (
            <li key={item[0]} data-show={item[0] === pathName ? 'no' : 'yes'}>
              <a href={item[0]}>{item[1]}</a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
