export const InternalLayout = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => {
  return (
    <div className={`w-full flex items-center flex-col ${className}`}>
      <div className={`max-w-[80%] ${className}`}>{children}</div>
    </div>
  );
};
