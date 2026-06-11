import { cn } from "@/lib/utils";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-neutral-800 bg-neutral-900/70 p-6 backdrop-blur-lg shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}
