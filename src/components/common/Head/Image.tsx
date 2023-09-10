'use client';

import Image from 'next/image';
import styles from './styles.module.scss';
import { useState } from 'react';
import Link from 'next/link';

const src_hover =
  'https://firebasestorage.googleapis.com/v0/b/foln-dev.appspot.com/o/github.png?alt=media&token=344e0917-abdd-4e57-8c80-172662c35a53';
const src_not_hover =
  'https://firebasestorage.googleapis.com/v0/b/foln-dev.appspot.com/o/1565609248634.jpeg?alt=media&token=81084dae-2484-4063-9842-87116ccab4fa';

export default function Head() {
  const [show, setShow] = useState(false);
  return (
    <Link
      href="https://github.com/FranciscoOssian/FranciscoOssian"
      className={styles.profilePic}
      data-content={!show ? 'tooltip-true' : ''}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}>
      <Image
        src={src_not_hover}
        alt=""
        layout="fill"
        style={{ transition: 'opacity 0.2s', opacity: show ? 0 : 1 }}
      />
      <Image
        src={src_hover}
        alt=""
        layout="fill"
        style={{ transition: 'opacity 0.2s', opacity: show ? 1 : 0 }}
      />
    </Link>
  );
}
