import Above from '@/components/common/Above';
import BentoPanel from '@/components/common/BentoPanel';
import { InternalLayout } from '@/components/common/InternalLayout';
import OpacityCard from '@/components/common/OpacityCard';
import Projects, { itemType } from '@/components/pages/home/Projects';
import { SectionSlide } from '@/components/pages/home/sectionSlide';

import getPage from '@/services/github/getPage';
import yamlToJSON from '@/services/yaml';

export default async function Home() {
  const page = await getPage('foln-cms-md', 'pages/index');
  const settings = await yamlToJSON(page.yaml[0].object.text);
  let DATA: itemType[] = settings.projects;

  return (
    <main className="flex flex-col">
      <Above link={settings.what_i_do.link} />
      <InternalLayout className="flex justify-center items-center flex-col gap-20 my-7">
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
            image={{
              src: 'https://firebasestorage.googleapis.com/v0/b/foln-dev.appspot.com/o/Group%201.svg?alt=media&token=d3a552ed-a4d9-4b2f-98e3-7d3c7124e13f',
            }}
          />
        </SectionSlide>
        <SectionSlide className="flex w-full justify-center items-center flex-col gap-24 max-md:gap-7">
          <h2
            id="projetos"
            className="font-bold text-6xl leading-10 text-secondary max-md:text-5xl max-md:left-9">
            PROJETOS
          </h2>
          <Projects list={DATA} />
        </SectionSlide>
      </InternalLayout>
    </main>
  );
}
