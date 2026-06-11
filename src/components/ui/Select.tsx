import { cn } from "@/lib/utils";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
};

export default function Select({ label, className, id, children, ...props }: SelectProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-neutral-300"
        >
          {label}
        </label>
      )}
      <select
        id={inputId}
        className={cn(
          "w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-3 text-white",
          "focus:outline-none focus:ring-2 focus:ring-blue-500",
          "min-h-[44px]",
          className
        )}
        {...props}
      >
        {children}
      </select>
    </div>
  );
}
