import Above from '@/components/common/Above';
import BentoPanel from '@/components/common/BentoPanel';
import OpacityCard from '@/components/common/OpacityCard';
import PageFrame from '@/components/common/PageFrame';
import ProjectsCard from '@/components/pages/home/ProjectsCard';
import { SectionSlide } from '@/components/pages/home/sectionSlide';

import getPage from '@/services/github/getPage';
import yamlToJSON from '@/services/yaml';

export default async function Home() {
  const page = await getPage('foln-cms-md', 'pages/index');
  const settings = await yamlToJSON(page.yaml[0].object.text);
  let DATA = settings.projects;
  DATA = DATA.map((item: any) => ({
    headerText: item.title,
    subHeaderText: item.type,
    videoUrl: item.videoUrl,
    media: item.media,
    titleText: item.shortDescription,
    subTitleText: item.tags.join(''),
    supportingText: item.description,
  }));

  return (
    <main className="flex flex-col gap-24 max-md:gap-0">
      <Above />
      <PageFrame className="flex justify-center items-center flex-col gap-24">
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
                href: 'https://api.whatsapp.com/send/?phone=5555859920485&text&type=phone_number&app_absent=0',
                svgPath: '/wpp-icon.svg',
              },
            ]}
          />
        </SectionSlide>
        <SectionSlide>
          <OpacityCard
            title={settings.what_i_do.title}
            text={settings.what_i_do.text}
            image={{ src: '/bg-placeholder.jpg' }}
            button={{
              href: settings.what_i_do.link,
            }}
          />
        </SectionSlide>
        <SectionSlide className="flex w-full justify-center items-center flex-col gap-24">
          <h2 id="projetos" className="font-bold text-6xl leading-10 text-white">
            Projetos
          </h2>
          <ProjectsCard list={DATA} />
        </SectionSlide>
      </PageFrame>
    </main>
  );
}
