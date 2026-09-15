type HeadingProps = {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
  className?: string;
};

const Heading = ({ title, subtitle, children, className }: HeadingProps) => {
  return (
    <div
      className={`page-header flex flex-wrap items-start gap-4 ${className ?? ""}`}
    >
      <div className="min-w-0 flex-1">
        <h1 className="page-title">{title}</h1>
        <p className="page-description">{subtitle}</p>
      </div>

      <div className="ml-auto shrink-0">{children}</div>
    </div>
  );
};

export default Heading;
