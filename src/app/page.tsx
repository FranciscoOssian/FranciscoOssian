/* eslint-disable @next/next/no-img-element */

import PinnedList from '@/components/pages/index/PinnedList';
import styles from '@/styles/page.module.scss';
import Contributions from '@/components/pages/index/Contributions';

import Image from 'next/image';
import PageContainer from '@/components/common/PageContainer';

export default function Home() {
  return (
    <main className={styles.main}>
      <PageContainer>
        <section className={styles.profile}>
          <div className={styles.profilePic}>
            <Image
              fill
              alt=""
              src="https://firebasestorage.googleapis.com/v0/b/foln-dev.appspot.com/o/emoji-home.png?alt=media&token=47eeebba-9522-41e5-9dc6-143b6db4e810"
            />
          </div>
          <div>
            <h1 className={styles.title}>Francisco Ossian</h1>
            <p className={styles.bio}>
              Desenvolvedor front-end, apaixonado por tecnologia e aprendizado contínuo.
            </p>
          </div>
        </section>
        <section className={styles.repos}>
          <h2 className={styles.title}>Repositórios</h2>
          <p>Aqui estão alguns dos meus repositórios no GitHub:</p>
          <PinnedList />
        </section>
        <section className={styles.contributions}>
          <h2 className={styles.title}>Contribuições</h2>
          <p>Aqui está o meu gráfico de contribuições do GitHub:</p>
          <Contributions />
        </section>
        <section className={styles.contact}>
          <h2 className={styles.title}>Contate-me</h2>
          <p>Interessado em trabalhar comigo ou quer dizer oi? Entre em contato.</p>
          <a href="/contato" className={styles.link}>
            Contato
          </a>
        </section>
      </PageContainer>
    </main>
  );
}
