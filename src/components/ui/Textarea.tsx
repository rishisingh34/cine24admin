import { cn } from "@/lib/utils";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
};

export default function Textarea({ label, className, id, ...props }: TextareaProps) {
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
      <textarea
        id={inputId}
        className={cn(
          "w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-3 text-white",
          "placeholder:text-neutral-500",
          "focus:outline-none focus:ring-2 focus:ring-blue-500",
          className
        )}
        {...props}
      />
    </div>
  );
}
