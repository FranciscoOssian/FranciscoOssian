import BentoPanel from "@/components/common/BentoPanel";
import OpacityCard from "@/components/common/OpacityCard";
import PageFrame from "@/components/common/PageFrame";
import Projets from "@/components/common/List";
import getPage from "@/services/github/getPage";
import yamlToJSON from "@/services/yaml";

export default async function Home() {
  const page = await getPage("foln-cms-md", "pages/index");
  const settings = await yamlToJSON(page.yaml[0].object.text);
  return (
    <main>
      <PageFrame className="lg:mt-[70px] bg-black">
        <BentoPanel
          image="/me-draw.png"
          title={settings.about.title}
          text={settings.about.text}
          links={[
            {
              href: "https://github.com/FranciscoOssian",
              svgPath: "/github-icon.svg",
            },
            {
              href: "https://www.youtube.com/user/canalbomon",
              svgPath: "/youtube-icon.svg",
            },
            {
              href: "https://www.linkedin.com/in/francisco-ossian",
              svgPath: "/linkedin-icon.svg",
            },
            {
              href: "https://api.whatsapp.com/send/?phone=5555859920485&text&type=phone_number&app_absent=0",
              svgPath: "/whatsapp-icon.svg",
            },
          ]}
        />
        <OpacityCard
          title={settings.what_i_do.title}
          text={settings.what_i_do.text}
          image={{ src: "/bg-placeholder.jpg" }}
          button={{
            href: settings.what_i_do.link,
          }}
          className="my-[70px]"
        />
        <Projets title="Projetos" list={settings.projects} />
      </PageFrame>
    </main>
  );
}
