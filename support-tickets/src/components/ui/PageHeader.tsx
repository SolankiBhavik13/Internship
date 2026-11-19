
interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold tracking-tight text-white">
        {title}
      </h1>

      {subtitle && (
        <p className="mt-2 text-sm leading-6 text-slate-400">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default PageHeader;
