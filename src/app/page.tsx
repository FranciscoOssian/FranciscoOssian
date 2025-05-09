import Above from '@/components/common/Above';
import BentoPanel from '@/components/common/BentoPanel';
import OpacityCard from '@/components/common/OpacityCard';
import PageFrame from '@/components/common/PageFrame';
import Projects, { itemType } from '@/components/pages/home/Projects';
import { SectionSlide } from '@/components/pages/home/sectionSlide';

import getPage from '@/services/github/getPage';
import yamlToJSON from '@/services/yaml';

export default async function Home() {
  const page = await getPage('foln-cms-md', 'pages/index');
  const settings = await yamlToJSON(page.yaml[0].object.text);
  let DATA: itemType[] = settings.projects;
  /*DATA = DATA.map((item: any) => ({
    headerText: item.title,
    subHeaderText: item.type,
    videoUrl: item.videoUrl,
    media: item.media,
    titleText: item.shortDescription,
    subTitleText: item.tags.join(''),
    supportingText: item.description,
  }));
  */

  DATA = [
    {
      context: '',
      involvement: 'Projeto pessoal',
      category: 'Aplicativo de rede social',
      title: 'Chalk',
      subtitle:
        'Desenvolvimento e lançamento de uma rede social para conectar pessoas, com foco em novos amigos, parceiros e grupos. O aplicativo possui um sistema de "match" customizado, proporcionando uma experiência única.',
      tags: ['React native', 'Expo', 'Firebase', 'I18N', 'Socket.io', 'Realm DB'],
      image: '/bg-placeholder.jpg',
      icon: 'https://firebasestorage.googleapis.com/v0/b/foln-dev.appspot.com/o/chalk-icon-gEQKlyu9TE.png?alt=media&token=25475572-f494-4886-94dd-bfb436586cb4',
    },
    {
      context: '',
      involvement: 'Projeto pessoal',
      category: 'Criador de Slides',
      title: 'CodeSlide',
      subtitle:
        'Criação do Code Slide, uma interface para criação e apresentação de slides feitos a partir de Markdown. Projetei um editor Markdown com visualização em tempo real do slide convertido, uma feature para baixar o slide em formato .html, e uma feature de compartilhamento. Onde usando uma rede p2p o usuário consegue visualizar o slide de outra pessoa e ver a edição',
      tags: ['React.js', 'Next.js', 'Marp', 'codemirror', 'P2P', 'WebRTC', 'tailwind'],
      image: '/bg-placeholder.jpg',
      icon: 'https://firebasestorage.googleapis.com/v0/b/foln-dev.appspot.com/o/1.png?alt=media&token=651daebc-e8cb-4075-8c05-96c93f8b491a',
    },
    {
      context: 'Trabalho',
      involvement: 'Em equipe',
      category: 'Web site institucional',
      title: 'Site ISGH',
      subtitle:
        'Desenvolvido junto com a equipa da Advance, de qual fiz parte da equipe de desenvolvimento web.',
      tags: ['React.js', 'Next.js', 'Github API', 'SCSS'],
      image: '/bg-placeholder.jpg',
      icon: 'https://firebasestorage.googleapis.com/v0/b/foln-dev.appspot.com/o/unnamed.jpg?alt=media&token=cd395f22-84fd-4eff-8667-71321091868d',
    },
    {
      context: '',
      involvement: 'Projeto pessoal',
      category: 'Web site',
      title: 'Blog',
      subtitle:
        'Desenvolvimento de um blog como repositório de aprendizado. Feita para isso uma biblioteca para consultar a API do Github e extrair arquivos .md e .yaml em um repositório como CMS do blog, feito em NEXT.js.',
      tags: ['React.js', 'Next.js', 'Github API', 'tailwind'],
      image: '/bg-placeholder.jpg',
      icon: 'https://firebasestorage.googleapis.com/v0/b/foln-dev.appspot.com/o/emoji-home.png?alt=media&token=47eeebba-9522-41e5-9dc6-143b6db4e810',
    },
  ];

  return (
    <main className="flex flex-col">
      <Above link={settings.what_i_do.link} />
      <PageFrame className="flex justify-center items-center flex-col gap-20 my-7">
        <SectionSlide>
          <BentoPanel
            title={settings.about.title}
            text={settings.about.text}
            links={[
              {
                href: 'https://github.com/FranciscoOssian',
                svgPath: '/github-icon.svg',
              },
              {
                href: 'https://www.linkedin.com/in/francisco-ossian',
                svgPath: '/linkedin-icon.svg',
              },
              {
                href: settings.what_i_do.link,
                svgPath: '/wpp-icon.svg',
              },
            ]}
          />
        </SectionSlide>
        <SectionSlide>
          <OpacityCard
            title={settings.what_i_do.title}
            text={settings.what_i_do.text}
            images={[
              { src: '/bg-placeholder.jpg' },
              {
                src: 'https://firebasestorage.googleapis.com/v0/b/foln-dev.appspot.com/o/bgjpg-874pe8uqj4.jpg?alt=media&token=b2f951a2-32f1-44d0-b369-42c0415a2e7d',
              },
            ]}
            button={{
              href: settings.what_i_do.link,
            }}
          />
        </SectionSlide>
        <SectionSlide className="flex w-full justify-center items-center flex-col gap-24">
          <h2 id="projetos" className="font-bold text-6xl leading-10 text-secondary">
            PROJETOS
          </h2>
          <Projects list={DATA} />
        </SectionSlide>
      </PageFrame>
    </main>
  );
}
