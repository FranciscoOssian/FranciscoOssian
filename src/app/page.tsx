"use client";

import useSWR from 'swr';

import styles from './page.module.css';
import Contributions from '@/components/pages/index/Contributions';
import PinnedList from '@/components/pages/index/PinnedList'

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function Home() {
  const { data, error } = useSWR('/api/data', fetcher);

  if (error) return <div>Erro ao carregar</div>
  if (!data) return <div>Carregando...</div>
  return (
    <main className={styles.main}>
      <section className={styles.profile}>
        <img src="/profile-pic.jpg" className={styles.profilePic} alt="Profile"/>
        <div>
          <h1 className={styles.title}>Francisco Ossian</h1>
          <p className={styles.bio}>Desenvolvedor front-end, apaixonado por tecnologia e aprendizado contínuo.</p>
        </div>
      </section>
      <section className={styles.repos}>
        <h2 className={styles.title}>Repositórios</h2>
        <p>Aqui estão alguns dos meus repositórios no GitHub:</p>
        <PinnedList repos={data?.pinnedRepos} />
      </section>
      <section className={styles.contributions}>
        <h2 className={styles.title}>Contribuições</h2>
        <p>Aqui está o meu gráfico de contribuições do GitHub:</p>
        <Contributions data={data.contributions} />
      </section>
      <section className={styles.contact}>
        <h2 className={styles.title}>Contate-me</h2>
        <p>Interessado em trabalhar comigo ou quer dizer oi? Entre em contato.</p>
        <a href="/contato" className={styles.link}>Contato</a>
      </section>
    </main>
  )
}
