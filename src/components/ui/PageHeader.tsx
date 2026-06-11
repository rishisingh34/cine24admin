import { cn } from "@/lib/utils";

type PageHeaderProps = {
  title: string;
  action?: React.ReactNode;
  className?: string;
};

export default function PageHeader({ title, action, className }: PageHeaderProps) {
  return (
    <div
      className={cn(
        "mb-6 flex flex-wrap items-center justify-between gap-4",
        className
      )}
    >
      <h1 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
        {title}
      </h1>
      {action}
    </div>
  );
}
