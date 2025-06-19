export const InternalLayout = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => {
  return (
    <div className={`w-full flex items-center flex-col ${className}`}>
      <div
        className={`w-internal-desktop max-internal-desktop:w-internal-tablet max-internal-tablet:w-[82.79%] max-internal-phone:w-[85%] ${className}`}>
        {children}
      </div>
    </div>
  );
};
