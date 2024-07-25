import Image from 'next/image';

interface CardProps {
  headerText?: string;
  subHeaderText?: string;
  style?: 'outlined' | 'evaluated' | 'filled';
  titleText?: string;
  subTitleText?: string;
  supportingText?: string;
  icon?: string;
  media?: string;
  backgroundState?: 'enabled' | 'hovered' | 'focused' | 'pressed' | 'dragged';
}

const InternalLayout: React.FC<React.PropsWithChildren<React.HTMLAttributes<{}>>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className={`w-[157px] ${className}`} {...rest}>
        {children}
      </div>
    </div>
  );
};

const Card = ({
  headerText,
  subHeaderText,
  titleText,
  subTitleText,
  supportingText,
  media,
  icon,
}: CardProps) => (
  <div className="rounded-xl bg-[#FEF7FF] h-88 w-44 py-7">
    <div id="header-text" className="text-center font-bold bg-slate-600 text-white w-full h-full">
      <div>{headerText}</div>
      <div>{subHeaderText}</div>
    </div>
    {media && (
      <div id="media" className="w-full relative h-[143px]">
        <Image src={media} alt={`${headerText} media`} style={{ objectFit: 'cover' }} fill />
      </div>
    )}
    <InternalLayout id="text" className="text-justify">
      <div>{titleText}</div>
      <div>{subTitleText}</div>
      <div>{supportingText}</div>
    </InternalLayout>
  </div>
);

export default Card;
