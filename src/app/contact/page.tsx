import RepoList from '@/components/common/RepoList';
import styles from '@/styles/page.module.scss';

export default function Home() {
  return (
    <main className={styles.main}>
      <RepoList
        showPublic={false}
        repos={[
          {
            url: 'https://www.linkedin.com/in/francisco-ossian',
            name: 'linkedin',
            description:
              'Meu perfil profissional. Estudante de Ciência da Computação e Desenvolvedor front-end com paixão por tecnologia e aprendizado contínuo.',
          },
          {
            url: 'https://github.com/FranciscoOssian',
            name: 'github',
            description:
              'Meu repositório de código. Universitário e desenvolvedor front-end apaixonado por resolver problemas e criar experiências visuais.',
          },
          {
            url: 'https://drive.google.com/file/d/15D1o5L3T0SbVst0F7OGJObHwkJDfx-ma/view?usp=sharing',
            name: 'CV',
            description: 'Meu currículo e projetos profissionais.',
          },
          {
            url: 'https://instagram.com/franciscoossianln?igshid=m4wdayipxlhq',
            name: 'instagram',
            description:
              'Minha jornada pessoal. Estudante de Ciência da Computação e entusiasta de desenvolvimento móvel. Compartilho momentos e interesses aqui.',
          },
          {
            url: 'https://www.youtube.com/user/canalbomon',
            name: 'youtube',
            description:
              'Meu canal no YouTube. Universitário apaixonado por tecnologia, arte e memes. Compartilho minha perspectiva e interesses digitais.',
          },
        ]}
      />
    </main>
  );
}
