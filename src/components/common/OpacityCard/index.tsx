import Image from 'next/image';
import Link, { LinkProps } from 'next/link';
import { Pictures } from './Pictures';

interface OpacityCardProps {
  title: string;
  text: string;
  button: LinkProps;
  className?: string;
  images: {
    src: string;
    alt?: string;
  }[];
}

//max-lg:bg-[url('/bg-placeholder.jpg')] bg-cover bg-center
const Background = ({ children }: any) => (
  <div className="relative overflow-hidden rounded-2xl h-full">
    <Image
      src="/bg-placeholder.jpg"
      fill
      alt={''}
      className="lg:hidden"
      style={{ objectFit: 'cover' }}
    />
    {children}
  </div>
);

const Text = ({ button, title, text }: { title: string; text: string; button: LinkProps }) => (
  <Background>
    <div className="p-6 max-lg:backdrop-brightness-[0.25] max-lg:w-[100vw] relative flex flex-col justify-between gap-5 ">
      <div className="lg:text-6xl max-lg:text-3xl">{title}</div>
      <div>{text}</div>
      <div className="max-lg:hidden">
        <Button {...button} />
      </div>
    </div>
  </Background>
);

const Button = (props: LinkProps) => (
  <Link {...props}>
    <div className="max-lg:w-[100vw] flex justify-center items-center base-button font-bold max-lg:px-10 w-[34.1875rem] h-[4.3125rem]">
      Quer saber como ? Contate-me
    </div>
  </Link>
);

const OpacityCard = ({ title, text, button, className, images }: OpacityCardProps) => {
  return (
    <section className={`flex flex-col ${className}`}>
      <div className="flex justify-between w-full text-white">
        {/* Text */}
        <Text button={button} title={title} text={text} />
        {/* Image */}
        <div className="max-lg:hidden">
          <Pictures images={images} />
        </div>
      </div>
      {/* Button */}
      <div className="lg:hidden mt-[1.25rem]">
        <Button {...button} />
      </div>
    </section>
  );
};

export default OpacityCard;
