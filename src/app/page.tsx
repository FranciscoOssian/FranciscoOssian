import Above from '@/components/common/Above';
import BentoPanel from '@/components/common/BentoPanel';
import Card from '@/components/common/Card';
import Footer from '@/components/common/Footer';
import OpacityCard from '@/components/common/OpacityCard';
import PageFrame from '@/components/common/PageFrame';
import { SectionSlide } from '@/components/pages/home/sectionSlide';

export default async function Home() {
  return (
    <main className="flex flex-col gap-24">
      <Above />
      <PageFrame className="flex justify-center items-center flex-col gap-24">
        <SectionSlide>
          <BentoPanel
            title="Olá"
            text="Sou Francisco Ossian, um entusiasta da tecnologia apaixonado por transformar ideias em realidade. Com uma combinação de determinação, criatividade e habilidades técnicas, estou sempre pronto para enfrentar novos desafios e entregar resultados excepcionais. Vamos trabalhar juntos para tornar seus projetos uma realidade!"
            links={[
              { svgPath: '/linkedin-icon.svg', href: '#' },
              { svgPath: '/github-icon.svg', href: '#' },
              { svgPath: '/wpp-icon.svg', href: '#' },
            ]}
          />
        </SectionSlide>
        <SectionSlide>
          <OpacityCard
            title="O que eu faço"
            text="Transformar conceitos em soluções digitais. Desde o desenvolvimento de sites responsivos até a criação de aplicativos móveis intuitivos, estou aqui para alcançar seus objetivos. Com expertise em tecnologias como React.js, React Native, Python e muito mais, estou preparado para enfrentar qualquer desafio."
            image={{ src: '/bg-placeholder.jpg' }}
            button={{ href: '' }}
          />
        </SectionSlide>
        <SectionSlide className="flex w-full justify-center items-center flex-col gap-24">
          <h2 className="font-bold text-6xl leading-10 text-white">Projetos</h2>
          <div className="flex gap-2 flex-wrap w-full justify-center items-center">
            {[
              {
                headerText: 'Chalk',
                subHeaderText: 'app',
                titleText: 'Rede social',
                subTitleText: 'react native; expo',
                supportingText:
                  'Rede social de descoberta de novas conecções, como um sistema de match como o tinder, e bate bapo.',
              },
              {
                headerText: 'CodeSlide',
                subHeaderText: 'site',
                titleText: 'Ferramenta',
                subTitleText: 'react.js; next.js',
                supportingText:
                  'Criador de Slides a partir de Markdonw. Escreva slides usando markdown, compile e compartilhe com amigos usando p2p. Powered by Markdown Presentation Ecosystem',
              },
              {
                headerText: 'Blog',
                subHeaderText: 'site',
                titleText: 'Blog',
                subTitleText: 'react.js; next.js',
                supportingText:
                  'Meu blog pessoal (dentro desse site) que uso para postar coisas da área.',
              },
              {
                headerText: 'Site ISGH',
                subHeaderText: 'site',
                titleText: 'Site',
                subTitleText: 'react.js; next.js',
                supportingText:
                  'Desenvolvido junto com a equipa da Advance, de qual fiz parte da equipe de desenvolvimento web. Tive tutoria de um desenvolvedor sênior em cada etapa',
              },
            ].map((projeto, i) => (
              <Card key={i} {...projeto} />
            ))}
          </div>
        </SectionSlide>
      </PageFrame>

      <Footer
        card={{
          image: '/me-draw.png',
          title: 'Francisco Ossian',
          text: 'Desenvolvendo ideias e criando soluções ',
        }}
        browse={['Blog', 'Work', 'Home']}
        services={[
          'Desenvolvimento Front-end',
          'Desenvolvimento Mobile',
          'Automação de Processos',
          'Desenvolvimento de APIs',
          'Consultoria e Auditoria de Código',
          'Desenvolvimento de Ferramentas e Utilitários',
          'Criação de Blogs e Conteúdo Técnico',
        ]}
        contact={[
          { src: '/github-icon.svg', href: '#' },
          { src: '/linkedin-icon.svg', href: '#' },
          { src: '/email-icon.svg', href: '#' },
        ]}
      />
    </main>
  );
}
