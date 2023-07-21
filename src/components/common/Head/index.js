import Image from './Image';

import styles from './styles.module.scss';

export default function Head() {
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
            <li key={item[0]}>
              <a href={item[0]}>{item[1]}</a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
