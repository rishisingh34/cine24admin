import { cn } from "@/lib/utils";
import Spinner from "./Spinner";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "destructive" | "success";
  loading?: boolean;
};

const variants = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white",
  secondary: "bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700",
  destructive: "bg-red-700 hover:bg-red-600 text-white",
  success: "bg-green-600 hover:bg-green-500 text-white",
};

export default function Button({
  variant = "primary",
  loading = false,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition duration-200 ease-out",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-neutral-950",
        "min-h-[44px]",
        variants[variant],
        className
      )}
      {...props}
    >
      {loading && <Spinner size="sm" />}
      {children}
    </button>
  );
}
