import { Picture } from './Picture';

interface OpacityCardProps {
  title: string;
  text: string;
  image: {
    src: string;
    alt?: string;
  };
}

const Text = ({ title, text }: { title: string; text: string }) => (
  <div className="w-full max-internal-phone:bg-gradient-to-r from-tertiary via-tertiary to-primary rounded-2xl p-[1px]">
    <div className="bg-tertiary rounded-2xl py-2">
      <div className="text-6xl max-internal-phone:text-2xl font-bold text-secondary">{title}</div>
      <div>{text}</div>
    </div>
  </div>
);

const OpacityCard = ({ title, text, image }: OpacityCardProps) => {
  return (
    <section className="w-full">
      <div className="w-full text-white grid grid-cols-2 max-internal-tablet:flex flex-col items-center">
        {/* Text */}
        <Text title={title} text={text} />
        {/* Image */}
        <div className="flex justify-end items-end">
          <Picture image={image} />
        </div>
      </div>
    </section>
  );
};

export default OpacityCard;
